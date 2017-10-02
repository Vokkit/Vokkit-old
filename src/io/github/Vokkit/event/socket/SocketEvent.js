const Event = require('../Event.js')

class SocketEvent extends Event {
  constructor (socket) {
    super()
    this.socket = socket
  }

  getSocket () {
    return this.socket
  }
}

module.exports = SocketEvent
