class SocketManager {
  init() {
    let LoginManager = require('./LoginManager.js')
    let MoveManager = require('./MoveManager.js')
    let WorldManager = require('./WorldManager.js')
    let PlayerSkinManager = require('./PlayerSkinManager.js')
    let DisconnectManager = require('./DisconnectManager.js')
    //let WebVRManager = require("./WebVRManager.js")
    let ChatManager = require('./ChatManager.js')
    let CommandManager = require('./CommandManager.js')

    this.loginManager = new LoginManager()
    this.moveManager = new MoveManager()
    this.worldManager = new WorldManager()
    this.playerSkinManager = new PlayerSkinManager()
    this.disconnectManager = new DisconnectManager()
    //this.webVRManager = new WebVRManager()
    this.chatManager = new ChatManager()
    this.commandManager = new CommandManager()
    this.commandManager.init()

    let socketManager = this

    Vokkit.getServer().getSocketServer().on('connection', function (socket) {
      socketManager.loginManager.addListener(socket)
      socketManager.moveManager.addListener(socket)
      socketManager.worldManager.addListener(socket)
      socketManager.playerSkinManager.addListener(socket)
      socketManager.disconnectManager.addListener(socket)
      //socketManager.webVRManager.addListener(socket)
      socketManager.chatManager.addListener(socket)
      socketManager.commandManager.addListener(socket)
    })
  }

  getLoginManager() {
    return this.loginManager
  }

  getMoveManager() {
    return this.moveManager
  }

  getWorldManager() {
    return this.worldManager
  }

  getPlayerSkinManager() {
    return this.playerSkinManager
  }

  getDisconnectManager() {
    return this.disconnectManager
  }

  getChatManager() {
    return this.chatManager
  }

  getCommandManager() {
    return this.commandManager
  }
}

module.exports = SocketManager
