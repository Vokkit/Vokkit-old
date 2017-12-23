const EventPriority = require('../event/EventPriority.js')

const fs = require('fs')
const path = require('path')
const webpack = require('webpack')
const webpackConfig = require('../../../../../webpack.config')

const Lang = require('../lang/Lang')

class PluginManager {
  init () {
    this.registeredEvents = []
    this.pluginPath = path.resolve('', 'plugins')
    this.clientPath = path.resolve('', 'public')
    this.plugins = []
    this.clientPlugins = []
  }

  loadPlugin (name) {
    if (!fs.existsSync(this.pluginPath + '/' + name + '/manifest.json')) return
    let manifest = JSON.parse(fs.readFileSync(this.pluginPath + '/' + name + '/manifest.json', 'utf-8'))
    Vokkit.getServer().getLogger().info(Lang.format('plugin.loading', [manifest.name, manifest.version]))
    try {
      let serverPlugin = new (require(this.pluginPath + '/' + name + '/' + manifest['server-plugin'] + '/' + manifest['server-main']))()
      this.plugins.push({
        plugin: serverPlugin,
        manifest: manifest
      })
      this.clientPlugins.push({
        path: '../../../plugins/' + manifest.name + '/' + manifest['client-plugin'] + '/' + manifest['client-main'],
        name: manifest.name
      })
      serverPlugin.onLoad()
      Vokkit.getServer().getLogger().info(Lang.format('plugin.load.succeed', [manifest.name, manifest.version]))
    } catch (e) {
      Vokkit.getServer().getLogger().info(Lang.format('plugin.load.fail', [manifest.name, manifest.version]))
      Vokkit.getServer().getLogger().warn(e.stack)
    }
  }

  loadPlugins () {
    let files = fs.readdirSync(this.pluginPath)
    for (let i in files) {
      this.loadPlugin(files[i])
    }
  }

  enablePlugins () {
    const promise = new Promise((resolve, reject) => {
      Vokkit.getServer().getLogger().info(Lang.format('client.building'))

      let pluginManagerPath = this.clientPath + '/src/plugin/PluginManager.js'

      if (!fs.existsSync(pluginManagerPath)) {
        throw Error(Lang.format('plugin.compile.first'))
      }

      let source = ['class PluginManager {',
        '    constructor () {',
        '        this.plugins = [];',
        '    }',
        '',
        '    load() {',
        '        this.loadedPlugins = {',
        '        };',
        '        for (let i in this.loadedPlugins) {',
        '            let plugin = new (this.loadedPlugins[i])();',
        '            plugin.onLoad();',
        '            this.plugins.push({',
        '                name: i,',
        '                plugin: plugin',
        '            });',
        '        }',
        '    }',
        '',
        '    enable() {',
        '        for (let i in this.plugins) {',
        '            this.plugins[i].plugin.onEnable();',
        '        }',
        '    }',
        '}',
        '',
        'module.exports = PluginManager;']
      let inject = []
      for (let i in this.clientPlugins) {
        inject.push(this.clientPlugins[i].name + ': require(\'' + this.clientPlugins[i].path + '\')')
      }

      source.splice(7, 0, inject.join(',\n'))
      fs.writeFileSync(pluginManagerPath, source.join('\n'))

      webpack(webpackConfig, (err, stats) => {
        if (err || stats.hasErrors()) {
          Vokkit.getServer().getLogger().info(Lang.format('client.build.fail'))

          reject(new Error(stats.toString()))
        }
        Vokkit.getServer().getLogger().info(Lang.format('client.build.succeed'))
        resolve()
      })

      for (let i in this.plugins) {
        Vokkit.getServer().getLogger().info(Lang.format('plugin.enabling', [this.plugins[i].manifest.name, this.plugins[i].manifest.version]))
        try {
          this.plugins[i].plugin.onEnable()
        } catch (e) {
          Vokkit.getServer().getLogger().info(Lang.format('plugin.enable.fail', [this.plugins[i].manifest.name, this.plugins[i].manifest.version]))
        }
        Vokkit.getServer().getLogger().info(Lang.format('plugin.enable.succeed', [this.plugins[i].manifest.name, this.plugins[i].manifest.version]))
      }
    })

    return promise
  }

  registerEvent (plugin, name, event, eventPriority = EventPriority.NORMAL) {
    this.registeredEvents.push({
      plugin: plugin,
      name: name,
      event: event,
      eventPriority: eventPriority
    })
  }

  makeEvent (event) {
    for (let i in this.registeredEvents) {
      if (this.registeredEvents[i].name === event.getEventName() && this.registeredEvents[i].eventPriority === EventPriority.HIGHEST) {
        this.registeredEvents[i].event(event)
      }
    }

    for (let i in this.registeredEvents) {
      if (this.registeredEvents[i].name === event.getEventName() && this.registeredEvents[i].eventPriority === EventPriority.HIGH) {
        this.registeredEvents[i].event(event)
      }
    }

    for (let i in this.registeredEvents) {
      if (this.registeredEvents[i].name === event.getEventName() && this.registeredEvents[i].eventPriority === EventPriority.NORMAL) {
        this.registeredEvents[i].event(event)
      }
    }

    for (let i in this.registeredEvents) {
      if (this.registeredEvents[i].name === event.getEventName() && this.registeredEvents[i].eventPriority === EventPriority.LOW) {
        this.registeredEvents[i].event(event)
      }
    }

    for (let i in this.registeredEvents) {
      if (this.registeredEvents[i].name === event.getEventName() && this.registeredEvents[i].eventPriority === EventPriority.LOWEST) {
        this.registeredEvents[i].event(event)
      }
    }

    for (let i in this.registeredEvents) {
      if (this.registeredEvents[i].name === event.getEventName() && this.registeredEvents[i].eventPriority === EventPriority.MONITOR) {
        this.registeredEvents[i].event(event)
      }
    }
  }
}

module.exports = PluginManager
