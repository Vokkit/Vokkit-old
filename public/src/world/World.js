const Block = require('../block/Block')
const Chunk = require('../Chunk')
const Material = require('../Materials')

class World {
  constructor (worldName) {
    this.worldName = worldName
    this.chunks = []
    this.prepared = false
  }

  static prepareWorlds (data) {
    for (var i in data) {
      var world = new World(data[i][0])
      data[i].splice(0, 1)
      world.prepareWorld(data[i])
      Vokkit.getClient().addWorld(world)
    }
  }

  prepareWorld (data) {
    var position = new THREE.Vector3()
    for (var i in data) {
      var blockData = data[i]
      var chunkExists = false
      const chunks = this.chunks
      for (var j in chunks) {
        if (chunks[j].containsPosition(position.set(blockData[0], blockData[1], blockData[2]))) {
          if (typeof chunks[j].chunkData[blockData[0]] === 'undefined') chunks[j].chunkData[blockData[0]] = []
          if (typeof chunks[j].chunkData[blockData[0]][blockData[1]] === 'undefined') chunks[j].chunkData[blockData[0]][blockData[1]] = []
          chunks[j].chunkData[blockData[0]][blockData[1]][blockData[2]] = new Block(new THREE.Vector3(blockData[0], blockData[1], blockData[2]), Material.get(blockData[3]))
          chunkExists = true
          break
        }
      }
      if (!chunkExists) {
        var chunk = new Chunk(Math.floor(blockData[0] / 16) * 16, Math.floor(blockData[2] / 16) * 16, [])
        if (typeof chunk.chunkData[blockData[0]] === 'undefined') chunk.chunkData[blockData[0]] = []
        if (typeof chunk.chunkData[blockData[0]][blockData[1]] === 'undefined') chunk.chunkData[blockData[0]][blockData[1]] = []
        chunk.chunkData[blockData[0]][blockData[1]][blockData[2]] = new Block(new THREE.Vector3(blockData[0], blockData[1], blockData[2]), Material.get(blockData[3]))
        chunks.push(chunk)
      }
    }
    this.prepared = true
  }

  getBlock (position) {
    const chunks = this.chunks
    if (!this.prepared) return
    for (var i in chunks) {
      if (chunks[i].containsPosition(position)) {
        return chunks[i].getBlock(position)
      }
    }
    return new Block(position, Material.AIR)
  }

  setBlock (block) {
    const chunks = this.chunks
    if (!this.prepared) return
    var chunkExists = false
    for (var i in chunks) {
      if (chunks[i].containsPosition(block.position)) {
        chunks[i].setBlock(block)
        chunkExists = true
        break
      }
    }
    if (!chunkExists) {
      var chunk = new Chunk(Math.floor(block.position.x / 16) * 16, Math.floor(block.position.z / 16) * 16, [])
      chunk.setBlock(block)
      this.chunks.push(chunk)
    }
  }

  getWorldName () {
    return this.worldName
  }

  getChunks () {
    return this.chunks
  }
}

module.exports = World
