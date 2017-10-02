const SocketEvent = require('./SocketEvent.js')

class SocketConnectionEvent extends SocketEvent {
  constructor (socket) {
    super(socket)
    // Useless constructor
  }
}

module.exports = SocketConnectionEvent
