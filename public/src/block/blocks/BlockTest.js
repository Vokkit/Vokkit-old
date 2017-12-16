const Block = require('./Block.js')
const BlockShape = require('./BlockShape.js')

class BlockTest extends Block {
  constructor () {
    let shape = new BlockShape(true)
    shape.addShape(0.4, 0.4, 0.4, 0.6, 0.6, 0.6)

    super(6, 0, [
      ['planks_oak', 'bedrock', 'stone', 'grass', 'dirt', 'cobblestone']
    ], 'Test', shape)
  }
}

module.exports = BlockTest
