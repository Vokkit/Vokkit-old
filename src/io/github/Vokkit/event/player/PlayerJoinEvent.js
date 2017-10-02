const PlayerEvent = require('./PlayerEvent.js')

class PlayerJoinEvent extends PlayerEvent {
  constructor (player, joinMessage) {
    super(player)
    this.eventName = 'PlayerJoinEvent'
    this.joinMessage = joinMessage
  }

  getJoinMessage () {
    return this.joinMessage
  }

  setJoinMessage (joinMessage) {
    this.joinMessage = joinMessage
  }
}

module.exports = PlayerJoinEvent
