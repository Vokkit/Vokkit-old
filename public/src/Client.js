var LoginManager = require('./client/LoginManager')
var MoveManager = require('./entity/MoveManager')
var WorldManager = require('./world/WorldManager')
var PlayerManager = require('./entity/PlayerManager')
var ScreenManager = require('./ui/ScreenManager')
var InputManager = require('./ui/InputManager')
var BlockTextureManager = require('./block/BlockTextureManager')
var UIManager = require('./ui/UIManager')
var ChatManager = require('./chat/ChatManager')
var PluginManager = require('./plugin/PluginManager')

const LocalPlayer = require('./entity/LocalPlayer')

/** @type {SocketIO.Server} */
var socket = io()
var loginManager
var moveManager
var worldManager
var playerManager
var screenManager
var inputManager
var blockTextureManager
var uiManager
var chatManager
var pluginManager

const isDebug = true

function Client () {
  var worldList = []
  var playerList = []
  var client = this
  var localPlayer = null
  this.loginInit = function () {
    pluginManager = new PluginManager()
    loginManager = new LoginManager(client)
    blockTextureManager = new BlockTextureManager()
    moveManager = new MoveManager()
    worldManager = new WorldManager()
    playerManager = new PlayerManager()
    screenManager = new ScreenManager()
    screenManager.init()
    inputManager = new InputManager()
    uiManager = new UIManager()
    chatManager = new ChatManager()
  }
  this.init = function () {
    // moveManager.init()
    // blockTextureManager.init()
    screenManager.init()
    screenManager.setScreen('MainScreen')
    // worldManager.init()
    screenManager.getScreen('MainScreen').drawWorld(worldList[0])
    // inputManager.init()
    screenManager.getScreen('MainScreen').start()
    uiManager.init()
    inputManager.setInput()
    // chatManager.init()
    pluginManager.enable()
  }
  this.getLoginManager = function () {
    return loginManager
  }
  this.getMoveManager = function () {
    return moveManager
  }
  this.getWorldManager = function () {
    return worldManager
  }
  this.getPlayerManager = function () {
    return playerManager
  }
  this.getScreenManager = function () {
    return screenManager
  }
  this.getInputManager = function () {
    return inputManager
  }
  this.getBlockTextureManager = function () {
    return blockTextureManager
  }
  this.getSocket = function () {
    return socket
  }
  this.getUIManager = function () {
    return uiManager
  }
  this.getChatManager = function () {
    return chatManager
  }
  this.getWorld = function (worldName) {
    for (var i in worldList) {
      if (worldList[i].getWorldName() === worldName) {
        return worldList[i]
      }
    }
    return null
  }
  this.getWorlds = function () {
    return worldList.slice()
  }
  this.addWorld = function (world) {
    worldList.push(world)
  }
  this.getPlayer = function (name) {
    for (var i in playerList) {
      if (playerList[i].getName() === name) {
        return playerList[i]
      }
    }
  }
  this.getPlayerById = function (id) {
    for (var i in playerList) {
      if (playerList[i].getId() === id) {
        return playerList[i]
      }
    }
  }
  this.getOnlinePlayers = function () {
    return playerList.slice()
  }
  this.addPlayer = function (player) {
    for (var i in playerList) {
      if (playerList[i].getId() === player.getId()) {
        return
      }
    }
    playerList.push(player)
  }
  this.removePlayer = function (id) {
    for (var i in playerList) {
      if (playerList[i].getId() === id) {
        playerList.splice(i, 1)
        return
      }
    }
  }
  this.getLocalPlayer = function () {
    for (var i in playerList) {
      if (playerList[i].getId() == socket.id) {
        return playerList[i]
      }
    }
  }
  this.isDebug = function () {
    return isDebug
  }
}

module.exports = Client
