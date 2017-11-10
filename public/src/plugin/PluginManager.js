class PluginManager {
  constructor () {
    this.plugins = []
    this.loadedPlugins = {}
  }

  disable () {
    for (const i in this.plugins) {
      this.plugins[i].plugin.onDisable()
    }
  }

  enable () {
    for (const i in this.plugins) {
      this.plugins[i].plugin.onEnable()
    }
  }

  load () {
    for (const i in this.loadedPlugins) {
      const plugin = new (this.loadedPlugins[i])()
      plugin.onLoad()
      this.plugins.push({
        name: i,
        plugin: plugin
      })
    }
  }
}

module.exports = PluginManager
