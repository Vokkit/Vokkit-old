const EventPriority = require('../event/EventPriority.js')

const fs = require('fs')
const path = require('path')
const Browserify = require('browserify')
const caller = require('caller-id')

class PluginManager {
  init () {
    this.registeredEvents = []
    this.pluginPath = path.resolve('', 'plugins')
    this.clientPath = path.resolve('', 'public')
    this.plugins = []
    this.clientPlugins = []
  }

  loadPlugin (name) {
    let manifest = JSON.parse(fs.readFileSync(this.pluginPath + '/' + name + '/manifest.json', 'utf-8'))
    Vokkit.getServer().getLogger().info(manifest.name + ' ' + manifest.version + ' 로드 중')
    let serverPlugin = new (require(this.pluginPath + '/' + name + '/' + manifest['server-plugin'] + '/' + manifest['server-main']))()
    this.plugins.push({
      plugin: serverPlugin,
      manifest: manifest
    })
    this.clientPlugins.push({
      path: '../../../../../../plugins/' + manifest.name + '/' + manifest['client-plugin'] + '/' + manifest['client-main'],
      name: manifest.name
    })
    Vokkit.getServer().getLogger().info(manifest.name + ' ' + manifest.version + ' 로드 완료')
    serverPlugin.onLoad()
  }

  loadPlugins () {
    let files = fs.readdirSync(this.pluginPath)
    for (let i in files) {
      this.loadPlugin(files[i])
    }
  }

  enablePlugins () {
    Vokkit.getServer().getLogger().info('클라이언트 빌드 중... 빌드는 비동기로 처리됩니다.')

    let pluginManagerPath = this.clientPath + '/src/io/github/Vokkit/plugin/PluginManager.js'
    let source = ['class PluginManager {',
      '    init() {',
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
    for (let i in this.clientPlugins) inject.push(this.clientPlugins[i].name + ': require(\'' + this.clientPlugins[i].path + '\')')
    source.splice(7, 0, inject.join(',\n'))
    fs.writeFileSync(pluginManagerPath, source.join('\n'))

    let browserify = new Browserify()
    browserify.add('./public/index.js')
    let stream = browserify.bundle()
    let contents = ''

    stream.on('data', function (data) {
      contents += data.toString()
    })

    stream.on('end', function () {
      fs.writeFileSync('./public/build.js', contents)
      Vokkit.getServer().getLogger().info('클라이언트를 빌드했습니다.')
    })

    for (let i in this.plugins) {
      Vokkit.getServer().getLogger().info(this.plugins[i].manifest.name + ' ' + this.plugins[i].manifest.version + ' 활성화 중')
      this.plugins[i].plugin.onEnable()
      Vokkit.getServer().getLogger().info(this.plugins[i].manifest.name + ' ' + this.plugins[i].manifest.version + ' 활성화 완료')
    }
  }

  registerEvent (name, event, eventPriority = EventPriority.NORMAL) {
    let path = caller.getData().filePath
    if (path.indexOf('Vokkit\\plugins\\') !== -1) {
      let pluginName = path.split('Vokkit\\plugins\\')[1].split('\\')[0]
      this.registeredEvents.push({
        pluginName: pluginName,
        name: name,
        event: event,
        eventPriority: eventPriority
      })
    }
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
