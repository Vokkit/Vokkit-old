const Block = require('./Block.js')

class BlockPlanks extends Block {
  constructor () {
    super(5, 0, [
      ['planks_oak', 'planks_oak', 'planks_oak', 'planks_oak', 'planks_oak', 'planks_oak']
    ], 'Planks')
  }
}

module.exports = BlockPlanks
