const World = require('./World.js')
const WorldGenerator = require('./WorldGenerator.js')
const Logger = new (require('./Logger.js'))()
const SocketConnectManager = require('./manager/SocketConnectManager.js')
const PluginManager = require('./plugin/PluginManager.js')
const ConsoleManager = require('./command/ConsoleManager.js')

const express = require('express')
const app = express()
const http = require('http').Server(app)
const io = require('socket.io')
const socketServer = io.listen(http)
const path = require('path')
const Lang = require('./lang/Lang')

let socketConnectManager
let consoleManager
let pluginManager
let worldGenerator

class Server {
  constructor () {
    this.playerList = []
    this.worldList = []
  }

  async init (startTime) {
    Vokkit.getServer().getLogger().title('Vokkit v0.0.1 (0)')
    process.on('uncaughtException', (err) => {
      Logger.warn(err.stack)
    })

    Logger.info(Lang.format('server.creating.world'))
    worldGenerator = new WorldGenerator(100, 100)
    await worldGenerator.generate()

    Logger.info(Lang.format('server.loading.world'))
    this.worldList = World.loadAllWorlds()
    Logger.info(Lang.format('server.loaded.world', [this.worldList.length]))

    Logger.info(Lang.format('server.loading.socket'))
    socketConnectManager = new SocketConnectManager()
    socketConnectManager.init()
    Logger.info(Lang.format('server.loaded.socket'))

    pluginManager = new PluginManager()
    pluginManager.init()
    pluginManager.loadPlugins()
    await pluginManager.enablePlugins()

    consoleManager = new ConsoleManager()
    consoleManager.init()

    Logger.info(Lang.format('server.opening'))
    app.use(express.static(path.join(path.resolve(''), 'public')))
    http.listen(3000, () => {
      let endTime = new Date().getTime()
      Logger.info(Lang.format('server.open', [((endTime - startTime) / 1000)]))
    })
  }

  getWorld (worldName) {
    for (let i in this.worldList) {
      if (this.worldList[i].getWorldName() === worldName) {
        return this.worldList[i]
      }
    }
    return null
  }

  getWorlds () {
    return this.worldList.slice()
  }

  getPlayer (name) {
    for (let i in this.playerList) {
      if (this.playerList[i].getName() === name) {
        return this.playerList[i]
      }
    }

    return null
  }

  addPlayer (player) {
    for (let i in this.playerList) {
      if (this.playerList[i].getId() === player.getId()) {
        return
      }
    }
    this.playerList.push(player)
  }

  removePlayer (player) {
    for (let i in this.playerList) {
      if (this.playerList[i].getId() === player.getId()) {
        this.playerList.splice(i, 1)
        return
      }
    }
  }

  getPlayerById (id) {
    for (let i in this.playerList) {
      if (this.playerList[i].getId() === id) {
        return this.playerList[i]
      }
    }

    return null
  }

  getPlayers () {
    return this.playerList.slice()
  }

  getSocketServer () {
    return socketServer
  }

  getLoginManager () {
    return socketConnectManager.loginManager
  }

  getMoveManager () {
    return socketConnectManager.moveManager
  }

  getWorldManager () {
    return socketConnectManager.worldManager
  }

  getPlayerSkinManager () {
    return socketConnectManager.playerSkinManager
  }

  getDisconnectManager () {
    return socketConnectManager.disconnectManager
  }

  getChatManager () {
    return socketConnectManager.chatManager
  }

  getCommandManager () {
    return socketConnectManager.commandManager
  }

  getSocketConnectManager () {
    return socketConnectManager
  }

  getPluginManager () {
    return pluginManager
  }

  getLogger () {
    return Logger
  }

  getName () {
    return 'server'
  }

  static get version () {
    return '0.0.1'
  }
}

module.exports = Server
