class PluginManager {
  constructor () {
    this.plugins = []
  }

  load () {
    this.loadedPlugins = {

    }
    for (let i in this.loadedPlugins) {
      let plugin = new (this.loadedPlugins[i])()
      plugin.onLoad()
      this.plugins.push({
        name: i,
        plugin: plugin
      })
    }
  }

  enable () {
    for (let i in this.plugins) {
      this.plugins[i].plugin.onEnable()
    }
  }
}

module.exports = PluginManager
