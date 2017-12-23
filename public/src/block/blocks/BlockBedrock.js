const Block = require('./Block.js')

class BlockBedrock extends Block {
  constructor () {
    super(7, 0, [
      ['bedrock', 'bedrock', 'bedrock', 'bedrock', 'bedrock', 'bedrock']
    ], 'Bedrock')
  }

  getResistance () {
    return -1
  }
}

module.exports = BlockBedrock
