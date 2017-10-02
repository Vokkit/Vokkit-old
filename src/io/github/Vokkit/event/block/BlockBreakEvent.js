const CancellableBlockEvent = require('./CancellableBlockEvent.js')

class BlockBreakEvent extends CancellableBlockEvent {
  constructor(block, player) {
    super(block)
    this.player = player
    this.dropItems = false
    this.eventName = 'BlockBreakEvent'
  }

  getPlayer() {
    return this.player
  }

  getBlock() {
    return this.block
  }

  setDropItems(dropItems = true) {
    this.dropItems = !!dropItems
  }

  isDropItems() {
    return this.dropItems
  }
}

module.exports = BlockBreakEvent