const Block = require('./Block.js')

class BlockSand extends Block {
  constructor () {
    super(12, 0, [
      ['sand', 'sand', 'sand', 'sand', 'sand', 'sand']
    ], 'Sand')
  }

  getResistance () {
    return 3
  }
}

module.exports = BlockDirt
