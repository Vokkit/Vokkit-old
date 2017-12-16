const Block = require('./Block.js')

class BlockAir extends Block {
  constructor () {
    super(0, 0, [], 'Air', null)
  }

  isSolid () {
    return false
  }

  isBreakable () {
    return false
  }
}

module.exports = BlockAir
