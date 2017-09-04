var EventPriority = require("../event/EventPriority.js");

var fs = require("fs");
var Module = require('module');
var path = require('path');
var browserify = require('browserify');
var child_process = require('child_process');

var Logger;

var io;


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
    list.forEach(function(file) {
        src = srcDir + '/' + file;
		dst = dstDir + '/' + file;
		//console.log(src);
        var stat = fs.statSync(src);
        if (stat && stat.isDirectory()) {
			try {
				//console.log('creating dir: ' + dst);
				fs.mkdirSync(dst);
			} catch(e) {
				//console.log('directory already exists: ' + dst);
			}
			results = results.concat(copy(src, dst));
		} else {
			try {
				//console.log('copying file: ' + dst);
				//fs.createReadStream(src).pipe(fs.createWriteStream(dst));
				fs.writeFileSync(dst, fs.readFileSync(src));
			} catch(e) {
				//console.log('could\'t copy file: ' + dst);
			}
			results.push(src);
		}
    });
    return results;
}

var rmdir = function(dir) {
    var list = fs.readdirSync(dir);
    for(var i = 0; i < list.length; i++) {
        var filename = path.join(dir, list[i]);
        var stat = fs.statSync(filename);

        if(filename == "." || filename == "..") {
            // pass these files
        } else if(stat.isDirectory()) {
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
    
    Logger = new (require("../Logger.js"))();

    var registeredEvents = [];

    var pluginPath = path.resolve("", "plugins");
    var clientPath = path.resolve("", "public");

    this.init = function() {
        /*
        io = {
            github: {
                Vokkit: {
                    Logger: require("../Logger.js"),
                    Material: require("../Material.js"),
                    Server: require("../Server.js"),
                    Vokkit: require("../Vokkit.js"),
                    World: require("../World.js"),
                    entity: {
                        Entity: require("../entity/Entity.js"),
                        Player: require("../entity/Player.js")
                    },
                    block: {
                        Block: require("../block/Block.js")
                    },
                    event: {
                        Event:  require("../event/Event.js"),
                        EventPriority: require("../event/EventPriority.js"),
                        block: {
                            BlockBreakEvent: require("../event/block/BlockBreakEvent.js"),
                            BlockPlaceEvent: require("../event/block/BlockPlaceEvent.js")
                        },
                        player: {
                            PlayerEvent: require("../event/player/PlayerEvent.js"),
                            PlayerJoinEvent: require("../event/player/PlayerJoinEvent.js"),
                            PlayerLoginEvent: require("../event/player/PlayerLoginEvent.js"),
                            PlayerMoveEvent: require("../event/player/PlayerMoveEvent.js"),
                            PlayerQuitEvent: require("../event/player/PlayerQuitEvent.js")
                        }
                    },
                    manager: {
                        DisconnectManager: require("../manager/DisconnectManager.js"),
                        LoginManager: require("../manager/DisconnectManager.js"),
                        MoveManager: require("../manager/DisconnectManager.js"),
                        PlayerSkinManager: require("../manager/DisconnectManager.js"),
                        SocketManager: require("../manager/DisconnectManager.js"),
                        WorldManager: require("../manager/DisconnectManager.js")
                    }
                }
            }
        }
        */
    }
    this.plugins = [];
    this.clientPlugins = [];
    var pluginManager = this;

    this.loadPlugin = function (name) {
        var manifest = JSON.parse(fs.readFileSync(pluginPath + "/" + name + "/manifest.json", "utf-8"));
        Logger.info(manifest.name + " " + manifest.version + " 로드 중");
        var serverPlugin = new (require(pluginPath + "/" + name + "/" + manifest["server-plugin"] + "/" + manifest["server-main"]))();
        var clientPlugin = pluginPath + "/" + name + "/" + manifest["client-plugin"];
        if (fs.existsSync(clientPath + "/src/" + manifest.name)) rmdir(clientPath + "/src/" + manifest.name);
        fs.mkdirSync(clientPath + "/src/" + manifest.name);
        copy(pluginPath + "/" + name + "/" + manifest["client-plugin"], clientPath + "/src/" + manifest.name);
        pluginManager.plugins.push({
            plugin: serverPlugin,
            manifest: manifest
        });
        pluginManager.clientPlugins.push({
            path: "../../../../" + manifest.name + "/" + manifest["client-main"],
            name: manifest.name
        });
        Logger.info(manifest.name + " " + manifest.version + " 로드 완료");
        serverPlugin.onLoad();
    }

    this.loadPlugins = function () {
        var files = fs.readdirSync(pluginPath);
        for (var i in files) {
            pluginManager.loadPlugin(files[i]);
        }
    }

    this.enablePlugins = function() {
        Logger.info("클라이언트 빌드 중...");

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

        var result = child_process.execSync("browserify " + clientPath + "/index.js -o " + clientPath + "/build.js");
        if (result instanceof Error) {
            Logger.warn(result);
            return;
        }
        Logger.info("클라이언트를 빌드했습니다.");

        for (var i in pluginManager.plugins) {
            Logger.info(pluginManager.plugins[i].manifest.name + " " + pluginManager.plugins[i].manifest.version + " 활성화 중");
            pluginManager.plugins[i].plugin.onEnable();
            Logger.info(pluginManager.plugins[i].manifest.name + " " + pluginManager.plugins[i].manifest.version + " 활성화 완료");
        }
    }

    this.reloadPlugin = function (name) {

    }

    this.reloadPlugins = function () {

    }

    this.registerEvent = function(pluginName, name, event, eventPriority) {
        if (eventPriority == undefined) eventPriority = EventPriority.NORMAL;
        registeredEvents.push({
            pluginName: pluginName,
            name: name,
            event: event,
            eventPriority: eventPriority
        });
    }

    this.makeEvent = function(event) {
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