var EventPriority = require("../event/EventPriority.js");

var fs = require("fs");
var Module = require('module');
var path = require('path');

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

function PluginManager() {
    
    Logger = new (require("../Logger.js"))();

    var registeredEvents = [];

    var pluginPath = path.resolve("", "plugins");

    this.init = function() {
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
    }

    this.pluginPath = path.resolve("", "plguins");
    this.plugins = [];
    var pluginManager = this;

    this.loadPlugin = function (name) {
        var add = "module.exports._onLoad_ = function(io) {global.io = io;\n";
        var manifest = JSON.parse(fs.readFileSync(pluginPath + "/" + name + "/manifest.json", "utf-8"));
        Logger.info(manifest.name + " " + manifest.version + " 로드 중");
        var plugin = requireFromString(add + fs.readFileSync(pluginPath + "/" + name + "/" + manifest.script, "utf-8") + "}");
        plugin._onLoad_(io);
        pluginManager.plugins.push({
            plugin: plugin,
            manifest: manifest
        });
        Logger.info(manifest.name + " " + manifest.version + " 로드 완료");
    }

    this.loadPlugins = function () {
        var files = fs.readdirSync(pluginPath);
        for (var i in files) {
            pluginManager.loadPlugin(files[i]);
        }
    }

    this.enablePlugins = function() {
        for (var i in registeredEvents) {
            if (registeredEvents[i].name == "onEnable") {
                var manifest;
                for (var j in pluginManager.plugins) {
                    if (pluginManager.plugins[j].manifest.name == registeredEvents[i].pluginName) {
                        manifest = pluginManager.plugins[j].manifest;
                    }
                }
                Logger.info(pluginManager.plugins[j].manifest.name + " " + pluginManager.plugins[j].manifest.version + " 활성화 중");
                registeredEvents[i].event();
                Logger.info(manifest.name + " " + manifest.version + " 활성화 완료");
            }
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