const CancellablePlayerEvent = require('./CancellablePlayerEvent.js')

class PlayerChatEvent extends CancellablePlayerEvent {
  constructor (player, sender, message, format) {
    super(player)
    this.sender = sender
    this.message = message
    this.format = format
    this.eventName = 'PlayerChatEvent'
  }

  getSender () {
    return this.sender
  }

  getMessage () {
    return this.message
  }

  getFormat () {
    return this.format
  }

  setSender (sender) {
    this.sender = sender
  }

  setMessage (message) {
    this.message = message
  }

  setFormat (format) {
    this.format = format
  }
}

module.exports = PlayerChatEvent
