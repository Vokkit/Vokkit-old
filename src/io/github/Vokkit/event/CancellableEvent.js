const Event = require('./Event.js')

class CancellableEvent extends Event {
  constructor () {
    super()
    this.cancelled = false
  }

  setCancelled (cancelled = true) {
    this.cancelled = !!cancelled
  }

  isCancelled () {
    return this.cancelled
  }
}

module.exports = CancellableEvent
