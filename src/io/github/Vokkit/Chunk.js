const Block = require('./block/Block.js')

class Chunk {
  constructor (x, z, chunkData) {
    this.x = x
    this.z = z
    this.chunkData = chunkData
  }

  getBlock (position) {
    let x = Math.floor(position.x)
    let y = Math.floor(position.y)
    let z = Math.floor(position.z)
    if (typeof this.chunkData[x] === 'undefined') return new Block(position, 0)
    if (typeof this.chunkData[x][y] === 'undefined') return new Block(position, 0)
    return this.chunkData[x][y][z] || new Block(position, 0)
  }

  setBlock (block) {
    let x = Math.floor(block.position.x)
    let y = Math.floor(block.position.y)
    let z = Math.floor(block.position.z)
    if (typeof this.chunkData[x] === 'undefined') this.chunkData[x] = []
    if (typeof this.chunkData[x][y] === 'undefined') this.chunkData[x][y] = []
    this.chunkData[x][y][z] = block
  }

  containsPosition (position) {
    return position.x >= this.x && position.x < this.x + 16 && position.z >= this.z && position.z < this.z + 16
  }
}

module.exports = Chunk
