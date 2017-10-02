const PlayerEvent = require('./PlayerEvent.js')

class PlayerQuitEvent extends PlayerEvent {
  constructor (player, quitMessage) {
    super(player)
    this.quitMessage = quitMessage
    this.eventName = 'PlayerQuitEvent'
  }

  getQuitMessage () {
    return this.quitMessage
  }

  setQuitMessage (message) {
    this.quitMessage = message
  }
}

module.exports = PlayerQuitEvent
