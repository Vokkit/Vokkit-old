const Block = require('./Block.js')
const BlockShape = require('./BlockShape.js')

class BlockTest extends Block {
  constructor () {
    let shape = new BlockShape(true)
    shape.addShape(0, 0, 0, 1, 0.5, 1)
    shape.addShape(0.5, 0.5, 0, 1, 1, 1)

    super(6, 0, [
      ['planks_oak', 'planks_oak', 'planks_oak', 'planks_oak', 'planks_oak', 'planks_oak'],
      ['planks_oak', 'planks_oak', 'planks_oak', 'planks_oak', 'planks_oak', 'planks_oak']
    ], 'Test', shape)
  }
}

module.exports = BlockTest
