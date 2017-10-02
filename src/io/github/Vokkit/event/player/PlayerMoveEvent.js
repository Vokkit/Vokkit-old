const CancellablePlayerEvent = require('./CancellablePlayerEvent.js')

class PlayerMoveEvent extends CancellablePlayerEvent {
  constructor (player, from, to) {
    super(player)
    this.from = from
    this.to = to
    this.eventName = 'PlayerMoveEvent'
  }

  getFrom () {
    return this.from
  }

  setFrom (from) {
    this.from = from
  }

  getTo () {
    return this.to
  }

  setTo (to) {
    this.to = to
  }
}

module.exports = PlayerMoveEvent
