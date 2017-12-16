const Block = require('./Block.js')

class BlockStone extends Block {
  constructor () {
    super(1, 0, [
      ['stone', 'stone', 'stone', 'stone', 'stone', 'stone']
    ], 'Stone')
  }

  getResistance () {
    return 30
  }
}

module.exports = BlockStone
