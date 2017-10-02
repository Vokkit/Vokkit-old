const CancellableServerEvent = require('./CancellableServerEvent.js')

class ServerCommandEvent extends CancellableServerEvent {
  constructor (sender, command, parameter) {
    super()
    this.sender = sender
    this.command = command
    this.parameter = parameter
    this.eventName = 'ServerCommandEvent'
  }

  getCommand () {
    return this.command
  }

  getParameter () {
    return this.parameter
  }

  getSender () {
    return this.sender
  }

  setCommand (command) {
    this.command = command
  }

  setParameter (parameter) {
    this.parameter = parameter
  }
}

module.exports = ServerCommandEvent
