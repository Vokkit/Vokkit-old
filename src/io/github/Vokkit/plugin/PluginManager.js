var EventPriority = require("../event/EventPriority.js");

var fs = require("fs");
var Module = require('module');
var path = require('path');
var Browserify = require('browserify');
var child_process = require('child_process');
var caller = require("caller-id");

function requireFromString(code, filename, opts) {
    if (typeof filename === 'object') {
        opts = filename;
        filename = undefined;
    }

    opts = opts || {};
    filename = filename || '';

    opts.appendPaths = opts.appendPaths || [];
    opts.prependPaths = opts.prependPaths || [];

    if (typeof code !== 'string') {
        throw new Error('code must be a string, not ' + typeof code);
    }

    var paths = Module._nodeModulePaths(path.dirname(filename));

    var m = new Module(filename, module.parent);
    m.filename = filename;
    m.paths = [].concat(opts.prependPaths).concat(paths).concat(opts.appendPaths);
    m._compile(code, filename);

    return m.exports;
};

function copy(srcDir, dstDir) {
    var results = [];
    var list = fs.readdirSync(srcDir);
    var src, dst;
    list.forEach(function (file) {
        src = srcDir + '/' + file;
        dst = dstDir + '/' + file;
        //console.log(src);
        var stat = fs.statSync(src);
        if (stat && stat.isDirectory()) {
            try {
                //console.log('creating dir: ' + dst);
                fs.mkdirSync(dst);
            } catch (e) {
                //console.log('directory already exists: ' + dst);
            }
            results = results.concat(copy(src, dst));
        } else {
            try {
                //console.log('copying file: ' + dst);
                //fs.createReadStream(src).pipe(fs.createWriteStream(dst));
                fs.writeFileSync(dst, fs.readFileSync(src));
            } catch (e) {
                //console.log('could\'t copy file: ' + dst);
            }
            results.push(src);
        }
    });
    return results;
}

var rmdir = function (dir) {
    var list = fs.readdirSync(dir);
    for (var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);

        if (filename == "." || filename == "..") {
            // pass these files
        } else if (stat.isDirectory()) {
            // rmdir recursively
            rmdir(filename);
        } else {
            // rm fiilename
            fs.unlinkSync(filename);
        }
    }
    fs.rmdirSync(dir);
};

function PluginManager() {

    var registeredEvents = [];

    var pluginPath = path.resolve("", "plugins");
    var clientPath = path.resolve("", "public");

    this.init = function () {

    }
    this.plugins = [];
    this.clientPlugins = [];
    var pluginManager = this;

    this.loadPlugin = function (name) {
        var manifest = JSON.parse(fs.readFileSync(pluginPath + "/" + name + "/manifest.json", "utf-8"));
        Vokkit.getServer().getLogger().info(manifest.name + " " + manifest.version + " 로드 중");
        var serverPlugin = new (require(pluginPath + "/" + name + "/" + manifest["server-plugin"] + "/" + manifest["server-main"]))();
        var clientPlugin = pluginPath + "/" + name + "/" + manifest["client-plugin"];
        //if (fs.existsSync(clientPath + "/src/" + manifest.name)) rmdir(clientPath + "/src/" + manifest.name);
        //fs.mkdirSync(clientPath + "/src/" + manifest.name);
        //copy(pluginPath + "/" + name + "/" + manifest["client-plugin"], clientPath + "/src/" + manifest.name);
        pluginManager.plugins.push({
            plugin: serverPlugin,
            manifest: manifest
        });
        pluginManager.clientPlugins.push({
            path: "../../../../../../plugins/" + manifest.name + "/" + manifest["client-plugin"] + "/" + manifest["client-main"],
            name: manifest.name
        });
        Vokkit.getServer().getLogger().info(manifest.name + " " + manifest.version + " 로드 완료");
        serverPlugin.onLoad();
    }

    this.loadPlugins = function () {
        var files = fs.readdirSync(pluginPath);
        for (var i in files) {
            pluginManager.loadPlugin(files[i]);
        }
    }

    this.enablePlugins = function () {
        Vokkit.getServer().getLogger().info("클라이언트 빌드 중... 빌드는 비동기로 처리됩니다.");

        var pluginManagerPath = clientPath + "/src/io/github/Vokkit/plugin/PluginManager.js";
        var source = ["class PluginManager {",
            "    init() {",
            "        this.plugins = [];",
            "    }",
            "",
            "    load() {",
            "        this.loadedPlugins = {",
            "        };",
            "        for (var i in this.loadedPlugins) {",
            "            var plugin = new (this.loadedPlugins[i])();",
            "            plugin.onLoad();",
            "            this.plugins.push({",
            "                name: i,",
            "                plugin: plugin",
            "            });",
            "        }",
            "    }",
            "",
            "    enable() {",
            "        for (var i in this.plugins) {",
            "            this.plugins[i].plugin.onEnable();",
            "        }",
            "    }",
            "}",
            "",
            "module.exports = PluginManager;"];
        var inject = [];
        for (var i in pluginManager.clientPlugins) inject.push(pluginManager.clientPlugins[i].name + ": require('" + pluginManager.clientPlugins[i].path + "')");
        source.splice(7, 0, inject.join(",\n"));
        fs.writeFileSync(pluginManagerPath, source.join("\n"));

        var browserify = new Browserify();
        browserify.add("./public/index.js");
        var stream = browserify.bundle();
        var contents = "";

        stream.on("data", function(data) {
            contents += data.toString();
        })

        stream.on("end", function() {
            fs.writeFileSync("./public/build.js", contents);
            Vokkit.getServer().getLogger().info("클라이언트를 빌드했습니다.");
        });

        for (var i in pluginManager.plugins) {
            Vokkit.getServer().getLogger().info(pluginManager.plugins[i].manifest.name + " " + pluginManager.plugins[i].manifest.version + " 활성화 중");
            pluginManager.plugins[i].plugin.onEnable();
            Vokkit.getServer().getLogger().info(pluginManager.plugins[i].manifest.name + " " + pluginManager.plugins[i].manifest.version + " 활성화 완료");
        }
    }

    this.reloadPlugin = function (name) {

    }

    this.reloadPlugins = function () {

    }

    this.registerEvent = function (name, event, eventPriority = EventPriority.NORMAL) {
        var path = caller.getData().filePath;
        if (path.indexOf("Vokkit\\plugins\\") != -1) {
            var pluginName = path.split("Vokkit\\plugins\\")[1].split("\\")[0];
            registeredEvents.push({
                pluginName: pluginName,
                name: name,
                event: event,
                eventPriority: eventPriority
            });
        }
    }

    this.makeEvent = function (event) {
        for (var i in registeredEvents) {
            if (registeredEvents[i].name == event.getEventName() && registeredEvents[i].eventPriority == EventPriority.HIGHEST) {
                registeredEvents[i].event(event);
            }
        }

        for (var i in registeredEvents) {
            if (registeredEvents[i].name == event.getEventName() && registeredEvents[i].eventPriority == EventPriority.HIGH) {
                registeredEvents[i].event(event);
            }
        }

        for (var i in registeredEvents) {
            if (registeredEvents[i].name == event.getEventName() && registeredEvents[i].eventPriority == EventPriority.NORMAL) {
                registeredEvents[i].event(event);
            }
        }

        for (var i in registeredEvents) {
            if (registeredEvents[i].name == event.getEventName() && registeredEvents[i].eventPriority == EventPriority.LOW) {
                registeredEvents[i].event(event);
            }
        }

        for (var i in registeredEvents) {
            if (registeredEvents[i].name == event.getEventName() && registeredEvents[i].eventPriority == EventPriority.LOWEST) {
                registeredEvents[i].event(event);
            }
        }

        for (var i in registeredEvents) {
            if (registeredEvents[i].name == event.getEventName() && registeredEvents[i].eventPriority == EventPriority.MONITOR) {
                registeredEvents[i].event(event);
            }
        }
    }
}

module.exports = PluginManager;