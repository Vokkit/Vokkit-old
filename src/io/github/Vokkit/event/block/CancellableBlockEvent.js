const CancellableEvent = require('./CancellableEvent.js')

class CancellableBlockEvent extends CancellableEvent {
  constructor(block) {
    super()
    this.block = block
  }

  getBlock() {
    return this.block
  }
}

module.exports = CancellableBlockEvent