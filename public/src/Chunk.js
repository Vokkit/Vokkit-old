const Block = require('./block/Block')
const BlockList = require('./block/BlockList.js')
const BlockTextureManager = require('./block/BlockTextureManager')

class Chunk {
  constructor (x, z, chunkData) {
    this.x = x
    this.z = z
    this.chunkData = chunkData

    this.textures = BlockTextureManager.getMicroCache().values()
    this.materials = []
    this.materialKeys = []
    for (const i in this.textures) {
      const texture = this.textures[i]
      texture.magFilter = THREE.NearestFilter
      texture.minFilter = THREE.LinearMipMapLinearFilter

      this.materials.push(new THREE.MeshBasicMaterial({
        map: texture
      }))

      this.materialKeys[i] = this.materials.length - 1
    }
    this.faceIndex = []
    const blocks = BlockList.getAllBlocks()
    for (let block of blocks) {
      if (block.getId() === 0) continue
      this.faceIndex[block.getId()] = []
      const m = block.getMesh()
      const g = m.geometry
      const ms = m.material
      for (const j in g.faces) {
        /**
         * @type {THREE.Face3}
         */
        const face = g.faces[j]
        /**
         * @type {THREE.MeshBasicMaterial}
         */
        const material = ms[face.materialIndex]
        for (const k in this.textures) {
          if (material.map.id === this.textures[k].id) {
            this.faceIndex[block.getId()][j] = this.materialKeys[k]
            break
          }
        }
      }
    }
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
    let geometry = new THREE.Geometry()
    var pos = new THREE.Vector3()
    for (var k = 0; k < 16; k++) {
      for (var j = 0; j < 256; j++) {
        for (var i = 0; i < 16; i++) {
          const id = this.getBlock(pos.set(this.x + i, j, this.z + k)).getId()
          if (!id) continue

          /**
           * @type {THREE.Mesh}
           */
          const m = BlockList.get(id).getMesh()
          const g = m.geometry
          for (const i in g.faces) {
            g.faces[i].materialIndex = this.faceIndex[id][i]
          }
          m.position.x += this.x + i
          m.position.y += j
          m.position.z += this.z + k
          m.updateMatrix()

          geometry.merge(g, m.matrix)
        }
      }
    }
    this.mesh = new THREE.Mesh(geometry, this.materials)
    return this.mesh
  }

  containsPosition (position) {
    return position.x >= this.x && position.x < this.x + 16 && position.z >= this.z && position.z < this.z + 16
  }

  getLastMesh () {
    return this.mesh
  }
}

module.exports = Chunk
