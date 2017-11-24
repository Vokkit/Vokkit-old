const CancellablePlayerEvent = require('./CancellablePlayerEvent.js')

class PlayerChatEvent extends CancellablePlayerEvent {
  constructor (player, message) {
    super(player)
    this.message = message
    this.eventName = 'PlayerChatEvent'
  }

  getMessage () {
    return this.message
  }

  setMessage (message) {
    this.message = message
  }
}

module.exports = PlayerChatEvent
