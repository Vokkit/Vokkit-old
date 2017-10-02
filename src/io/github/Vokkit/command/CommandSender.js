class CommandSender {
  constructor(player) {
    if(typeof player === 'string') {
      this.isPlayer = false
    } else {
      this.isPlayer = true
    }

    this.player = player
  }

  getName() {
    if(this.isPlayer)
      return this.player.getName()
    else
      return this.player
  }

  getPlayer() {
    return this.player
  }

  getServer() {
    return Vokkit.getServer()
  }

  isPlayer() {
    return this.isPlayer
  }
}

module.exports = CommandSender
