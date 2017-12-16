const Block = require('./Block.js')

class BlockCobblestone extends Block {
  constructor () {
    super(4, 0, [
      ['cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone', 'cobblestone']
    ], 'cobblestone')
  }
}

module.exports = BlockCobblestone
