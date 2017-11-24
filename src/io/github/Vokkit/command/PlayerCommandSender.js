const CommandSender = require('./CommandSender.js')

class PlayerCommandSender extends CommandSender {
  constructor (player) {
    super()
    this.player = player
  }

  sendMessage (message) {
    this.player.sendMessage(message)
  }

  broadcast (message) {
    Vokkit.getServer().getChatManager().broadcast(message)
  }

  getName () {
    return this.player.getName()
  }

  getPlayer () {
    return this.player
  }

  getServer () {
    return Vokkit.getServer()
  }
}

module.exports = PlayerCommandSender
