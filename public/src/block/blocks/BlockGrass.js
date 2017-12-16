const Block = require('./Block.js')

class BlockGrass extends Block {
  constructor () {
    super(2, 0, [
      ['grass_side', 'grass_side', 'grass', 'dirt', 'grass_side', 'grass_side']
    ], 'Grass')
  }

  getResistance () {
    return 3
  }
}

module.exports = BlockGrass
