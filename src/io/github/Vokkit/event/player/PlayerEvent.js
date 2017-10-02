const Event = require('../Event.js')

class PlayerEvent extends Event {
  constructor (player) {
    super()
    this.player = player
  }

  getPlayer () {
    return this.player
  }
}

module.exports = PlayerEvent
