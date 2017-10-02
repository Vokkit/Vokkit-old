const CancellablePlayerEvent = require('./CancellablePlayerEvent.js')

class PlayerLoginEvent extends CancellablePlayerEvent {
  constructor (player, address) {
    super(player)
    this.address = address
    this.reason = ''
    this.eventName = 'PlayerLoginEvent'
  }

  getAddress () {
    return this.address
  }

  getReason () {
    return this.reason
  }

  setReason (reason) {
    this.reason = reason
  }
}

module.exports = PlayerLoginEvent
