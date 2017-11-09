const LoginManager = require('./LoginManager.js')
const MoveManager = require('./MoveManager.js')
const WorldManager = require('./WorldManager.js')
const PlayerSkinManager = require('./PlayerSkinManager.js')
const DisconnectManager = require('./DisconnectManager.js')
const ChatManager = require('./ChatManager.js')
const CommandManager = require('./CommandManager.js')

class SocketConnectManager {
  init () {
    this.loginManager = new LoginManager()
    this.moveManager = new MoveManager()
    this.worldManager = new WorldManager()
    this.playerSkinManager = new PlayerSkinManager()
    this.disconnectManager = new DisconnectManager()
    this.chatManager = new ChatManager()
    this.commandManager = new CommandManager()
    this.commandManager.init()

    const socketConnectManager = this

    Vokkit.getServer().getSocketServer().on('connection', function (socket) {
      socketConnectManager.loginManager.addListener(socket)
      socketConnectManager.moveManager.addListener(socket)
      socketConnectManager.worldManager.addListener(socket)
      socketConnectManager.playerSkinManager.addListener(socket)
      socketConnectManager.disconnectManager.addListener(socket)
      socketConnectManager.chatManager.addListener(socket)
      socketConnectManager.commandManager.addListener(socket)
    })
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

  getPlayerSkinManager () {
    return this.playerSkinManager
  }

  getDisconnectManager () {
    return this.disconnectManager
  }

  getChatManager () {
    return this.chatManager
  }

  getCommandManager () {
    return this.commandManager
  }
}

module.exports = SocketConnectManager
