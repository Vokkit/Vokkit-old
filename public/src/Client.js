const LoginManager = require('./client/LoginManager')
const MoveManager = require('./entity/MoveManager')
const WorldManager = require('./world/WorldManager')
const PlayerManager = require('./entity/PlayerManager')
const ScreenManager = require('./ui/ScreenManager')
const InputManager = require('./ui/InputManager')
const BlockTextureManager = require('./block/BlockTextureManager')
const ChatManager = require('./chat/ChatManager')
const PluginManager = require('./plugin/PluginManager')
const Lang = require('./lang/Lang')

const isDebug = false

class Client {
  constructor () {
    this.worldList = []
    this.playerList = []
    this.socket = io()
  }
  loginInit () {
    Lang.setLanguage(navigator.language.substring(0, 2))
    this.pluginManager = new PluginManager()
    this.pluginManager.load()
    this.loginManager = new LoginManager(this)
    this.blockTextureManager = new BlockTextureManager()
    this.moveManager = new MoveManager()
    this.worldManager = new WorldManager()
    this.playerManager = new PlayerManager()
    this.screenManager = new ScreenManager()
    this.screenManager.init()
    this.inputManager = new InputManager()
    this.chatManager = new ChatManager()
    this.screenManager.addScreen('LoginScreen')
  }
  init () {
    // moveManager.init()
    // blockTextureManager.init()
    this.screenManager.init()
    this.screenManager.addScreen('MainScreen')
    this.screenManager.addScreen('MainUIScreen')
    // worldManager.init()
    this.screenManager.getScreen('MainScreen').drawWorld(this.worldList[0])
    // inputManager.init()
    this.screenManager.getScreen('MainScreen').start()
    this.inputManager.setInput()
    // chatManager.init()
    this.pluginManager.enable()
  }
  getLoginManager () {
    return this.loginManager
  }
  getMoveManager () {
    return this.moveManager
  }
  getWorldManager () {
    return this.worldManager
  }
  getPlayerManager () {
    return this.playerManager
  }
  getScreenManager () {
    return this.screenManager
  }
  getInputManager () {
    return this.inputManager
  }
  getBlockTextureManager () {
    return this.blockTextureManager
  }
  getSocket () {
    return this.socket
  }
  getChatManager () {
    return this.chatManager
  }
  getWorld (worldName) {
    for (const i in this.worldList) {
      if (this.worldList[i].getWorldName() === worldName) {
        return this.worldList[i]
      }
    }
    return null
  }
  getWorlds () {
    return this.worldList.slice()
  }
  addWorld (world) {
    this.worldList.push(world)
  }
  getPlayer (name) {
    for (const i in this.playerList) {
      if (this.playerList[i].getName() === name) {
        return this.playerList[i]
      }
    }
  }
  getPlayerById (id) {
    for (const i in this.this.playerList) {
      if (this.playerList[i].getId() === id) {
        return this.playerList[i]
      }
    }
  }
  getOnlinePlayers () {
    return this.playerList.slice()
  }
  addPlayer (player) {
    for (const i in this.playerList) {
      if (this.playerList[i].getId() === player.getId()) {
        return
      }
    }
    this.playerList.push(player)
  }
  removePlayer (id) {
    for (const i in this.playerList) {
      if (this.playerList[i].getId() === id) {
        this.playerList.splice(i, 1)
        return
      }
    }
  }
  getLocalPlayer () {
    for (const i in this.playerList) {
      if (this.playerList[i].getId() === this.socket.id) {
        return this.playerList[i]
      }
    }
  }
  isDebug () {
    return isDebug
  }
}

module.exports = Client
