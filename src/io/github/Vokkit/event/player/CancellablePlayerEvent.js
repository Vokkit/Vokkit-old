const CancellableEvent = require('../CancellableEvent.js')

class CancellablePlayerEvent extends CancellableEvent {
  constructor (player) {
    super()
    this.player = player
  }

  getPlayer () {
    return this.player
  }
}

module.exports = CancellablePlayerEvent
