var Player = require('./entity/Player.js')
var World = require('./World.js')
var Logger = (require('./Logger.js'))();
var SocketManager = require('./manager/SocketManager.js')
var PluginManager = require('./plugin/PluginManager.js')
var ConsoleManager = require('./command/ConsoleManager.js')

var express = require('express')
var app
var http
var io = require('socket.io')
var socketServer
var path = require('path')

var socketManager
var consoleManager
var pluginManager

function Server() {
  var playerList = []
  var worldList = []

  this.init = function (startTime) {
    process.on('uncaughtException', function (err) {
      Logger.warn(err.stack)
    })
    app = express()
    http = require('http').Server(app)
    socketServer = io.listen(http)

    Logger.info('월드를 불러오는 중...')
    worldList = World.getAllWorlds()
    Logger.info(worldList.length + '개의 월드를 불러왔습니다.')

    Logger.info('통신 기능을 불러오는 중...')
    socketManager = new SocketManager()
    socketManager.init()
    Logger.info('통신 기능을 불러왔습니다.')

    pluginManager = new PluginManager()
    pluginManager.init()
    pluginManager.loadPlugins()
    pluginManager.enablePlugins()

    consoleManager = new ConsoleManager()
    consoleManager.init()

    Logger.info('서버를 여는 중...')
    app.use(express.static(path.join(path.resolve(''), 'public')))
    http.listen(3000, function () {
      var endTime = new Date().getTime()
      Logger.info('완료 (' + ((endTime - startTime) / 1000) + '초)! 도움말을 보시려면 "help" 또는 "?" 를 입력해 주세요')
    })
  }
  this.getWorld = function (worldName) {
    for (var i in worldList) {
      if (worldList[i].getWorldName() == worldName) {
        return worldList[i]
      }
    }
    return null
  }
  this.getWorlds = function () {
    return worldList.slice()
  }
  this.getPlayer = function (name) {
    for (var i in playerList) {
      if (playerList[i].getName() == name) {
        return playerList[i]
      }
    }

    return null
  }
  this.addPlayer = function (player) {
    for (var i in playerList) {
      if (playerList[i].getId() == player.getId()) {
        return
      }
    }
    playerList.push(player)
  }
  this.removePlayer = function (player) {
    for (var i in playerList) {
      if (playerList[i].getId() == player.getId()) {
        playerList.splice(i, 1)
        return
      }
    }
  }
  this.getPlayerById = function (id) {
    for (var i in playerList) {
      if (playerList[i].getId() == id) {
        return playerList[i]
      }
    }

    return null
  }
  this.getPlayers = function () {
    return playerList.slice()
  }
  this.getSocketServer = function () {
    return socketServer
  }
  this.getDisconnectManager = function () {
    return socketManager.disconnectManager
  }
  this.getLoginManager = function () {
    return socketManager.loginManager
  }
  this.getMoveManager = function () {
    return socketManager.moveManager
  }
  this.getPlayerSkinManager = function () {
    return socketManager.playerSkinManager
  }
  this.getSocketManager = function () {
    return socketManager
  }
  this.getWorldManager = function () {
    return socketManager.worldManager
  }
  this.getPluginManager = function () {
    return pluginManager
  }
  this.getLogger = function () {
    return Logger
  }

  this.getName = function () {
    return 'server'
  }
}

Server.protocolVersion = 1
Server.version = '0.0.1'

module.exports = Server
