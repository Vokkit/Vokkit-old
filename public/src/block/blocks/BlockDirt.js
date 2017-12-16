const Block = require('./Block.js')

class BlockDirt extends Block {
  constructor () {
    super(3, 0, [
      ['dirt', 'dirt', 'dirt', 'dirt', 'dirt', 'dirt']
    ], 'Dirt')
  }

  getResistance () {
    return 3
  }
}

module.exports = BlockDirt
