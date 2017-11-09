class PluginManager {
    constructor () {
        this.plugins = [];
    }

    load() {
        this.loadedPlugins = {
EssentialCommands: require('../../../plugins/EssentialCommands/client/index.js'),
JavaMAL: require('../../../plugins/JavaMAL/client/index.js'),
MuseClientSupport: require('../../../plugins/MuseClientSupport/client/index.js'),
WebVR: require('../../../plugins/WebVR/client/index.js')
        };
        for (let i in this.loadedPlugins) {
            let plugin = new (this.loadedPlugins[i])();
            plugin.onLoad();
            this.plugins.push({
                name: i,
                plugin: plugin
            });
        }
    }

    enable() {
        for (let i in this.plugins) {
            this.plugins[i].plugin.onEnable();
        }
    }
}

module.exports = PluginManager;