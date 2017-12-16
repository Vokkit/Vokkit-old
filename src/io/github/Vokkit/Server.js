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
const fs = require('fs')

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
    process.on('uncaughtException', function (err) {
      Logger.warn(err.stack)
    })

    if (!fs.existsSync('worlds/world.txt')) {
      Logger.info('월드를 생성하는 중...')
      worldGenerator = new WorldGenerator(100, 100)
      await worldGenerator.generate()
    }

    Logger.info('월드를 불러오는 중...')
    this.worldList = World.loadAllWorlds()
    Logger.info(this.worldList.length + '개의 월드를 불러왔습니다.')

    Logger.info('통신 기능을 불러오는 중...')
    socketConnectManager = new SocketConnectManager()
    socketConnectManager.init()
    Logger.info('통신 기능을 불러왔습니다.')

    pluginManager = new PluginManager()
    pluginManager.init()
    pluginManager.loadPlugins()
    await pluginManager.enablePlugins()

    consoleManager = new ConsoleManager()
    consoleManager.init()

    Logger.info('서버를 여는 중...')
    app.use(express.static(path.join(path.resolve(''), 'public')))
    http.listen(3000, () => {
      let endTime = new Date().getTime()
      Logger.info('완료 (' + ((endTime - startTime) / 1000) + '초)! 도움말을 보시려면 "help" 또는 "?" 를 입력해 주세요')
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

  static get protocolVersion () {
    return 1
  }

  static get version () {
    return '0.0.1'
  }
}

module.exports = Server
