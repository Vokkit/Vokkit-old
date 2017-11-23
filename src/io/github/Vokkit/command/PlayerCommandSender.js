const CommandSender = require('./CommandSender.js')

class PlayerCommandSender extends CommandSender {
  constructor (player) {
    super()
    this.player = player
  }

  sendMessage (sender, message, format = '<%s> %s\n') {
    this.player.sendMessage(sender, message, format)
  }

  broadcast (sender, message, format = '<%s> %s\n') {
    Vokkit.getServer().getChatManager().broadcast(sender, message, format)
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
