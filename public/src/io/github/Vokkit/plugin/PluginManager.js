class PluginManager {
    init() {
        this.plugins = [];
    }

    load() {
        this.loadedPlugins = {
JavaMAL: require('../../../../../../plugins/JavaMAL/client/index.js')
        };
        for (var i in this.loadedPlugins) {
            var plugin = new (this.loadedPlugins[i])();
            plugin.onLoad();
            this.plugins.push({
                name: i,
                plugin: plugin
            });
        }
    }

    enable() {
        for (var i in this.plugins) {
            this.plugins[i].plugin.onEnable();
        }
    }
}

module.exports = PluginManager;