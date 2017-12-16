const Block = require('./block/Block')
const BlockList = require('./block/BlockList.js')
const CulledMesher = require('./mesher/CulledMesher')
const GreedyMesher = require('./mesher/GreedyMesher')

class Chunk {
  constructor (x, z, chunkData) {
    this.x = x
    this.z = z
    this.chunkData = chunkData
  }

  getBlock (position) {
    var x = Math.floor(position.x)
    var y = Math.floor(position.y)
    var z = Math.floor(position.z)
    if (typeof this.chunkData[x] === 'undefined') return new Block(position.clone(), BlockList.AIR)
    if (typeof this.chunkData[x][y] === 'undefined') return new Block(position.clone(), BlockList.AIR)

    return this.chunkData[x][y][z] || new Block(position.clone(), BlockList.AIR)
  }

  setBlock (block) {
    var x = Math.floor(block.position.x)
    var y = Math.floor(block.position.y)
    var z = Math.floor(block.position.z)
    if (typeof this.chunkData[x] === 'undefined') this.chunkData[x] = []
    if (typeof this.chunkData[x][y] === 'undefined') this.chunkData[x][y] = []
    this.chunkData[x][y][z] = block
    Vokkit.getClient().getScreenManager().getScreen('MainScreen').reloadChunk(this)
  }

  mesher () {
    let mesh = []

    var pos = new THREE.Vector3()
    for (var k = 0; k < 16; k++) {
      for (var j = 0; j < 256; j++) {
        for (var i = 0; i < 16; i++) {
          const id = this.getBlock(pos.set(this.x + i, j, this.z + k)).getId()
          if (!id) continue

          const m = BlockList.get(id).getMesh()
          m.position.x += this.x + i
          m.position.y += j
          m.position.z += this.z + k

          mesh.push(m)
        }
      }
    }

    return mesh
  }

  containsPosition (position) {
    return position.x >= this.x && position.x < this.x + 16 && position.z >= this.z && position.z < this.z + 16
  }

  getLastMesh () {
    return this.mesh
  }
}

module.exports = Chunk
