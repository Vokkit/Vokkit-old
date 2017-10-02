const Event = require('./Event.js')

class BlockEvent extends Event {
  constructor(block) {
    super()
    this.block = block
  }

  getBlock() {
    return this.block
  }
}

module.exports = BlockEvent