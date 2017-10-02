class CommandSender {
  constructor (player) {
    this.player = player
  }

  sendMessage (message) {
    this.player.sendMessage(Vokkit.getServer().getName(), message)
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

module.exports = CommandSender
