const Block = require('./block/Block')
const BlockList = require('./block/BlockList.js')
const BlockTextureManager = require('./block/BlockTextureManager')
const GreedyMesher = require('./mesher/GreedyMesher')

const high = [16, 256, 16]
const low = [0, 0, 0]
const dims = [high[0] - low[0], high[1] - low[1], high[2] - low[2]]

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

  toMesherData () {
    const volume = []
    const not = []
    const pos = new THREE.Vector3()
    for (let k = low[2]; k < high[2]; k++) {
      for (let j = low[1]; j < high[1]; j++) {
        for (let i = low[0]; i < high[0]; i++) {
          const block = this.getBlock(pos.set(this.x + i, j, this.z + k))
          const blockData = BlockList.get(block.getId())
          if (!blockData || blockData.isCubeShape()) {
            volume.push(this.getBlock(pos.set(this.x + i, j, this.z + k)).getId())
          } else {
            volume.push(0)
            not.push({
              position: pos.set(this.x + i, j, this.z + k).clone(),
              id: this.getBlock(pos.set(this.x + i, j, this.z + k)).getId()
            })
          }
        }
      }
    }

    return {volume, dims, not}
  }

  mesher () {
    const mesherData = this.toMesherData()
    const result = GreedyMesher.optimize(mesherData.volume, mesherData.dims)
    const geometry = new THREE.Geometry()
    const testGeometry = new THREE.Geometry()

    for (const i in result.vertices) {
      geometry.vertices.push(new THREE.Vector3(result.vertices[i][0], result.vertices[i][1], result.vertices[i][2]))
    }

    testGeometry.vertices = geometry.vertices

    let materials = []
    const typestart = []
    const blocks = BlockList.getAllBlocks()
    for (const i in blocks) {
      if (i === '0') continue
      typestart[i] = materials.length
      materials = materials.concat(blocks[i].getMesh().material)
    }

    for (const i in result.faces) {
      const faces = result.faces[i]
      const face = new THREE.Face3(faces[0], faces[1], faces[2])
      const face2 = new THREE.Face3(faces[0], faces[2], faces[3])
      const type = faces[4]
      const add = typestart[type]
      const a = testGeometry.vertices[face.a]
      const b = testGeometry.vertices[face.b]
      const c = testGeometry.vertices[face.c]
      testGeometry.faces.push(face)
      testGeometry.computeFaceNormals()
      const normal = testGeometry.faces[0].normal
      if (normal.x === 1) { // 여기 문제
        face.materialIndex = add
        face2.materialIndex = add
        const miny = Math.min(a.y, b.y, c.y)
        const maxy = Math.max(a.y, b.y, c.y)
        const minz = Math.min(a.z, b.z, c.z)
        const maxz = Math.max(a.z, b.z, c.z)
        const multiply = new THREE.Vector2(maxz - minz, maxy - miny)
        geometry.faceVertexUvs[0].push([new THREE.Vector2(1, 0).multiply(multiply), new THREE.Vector2(1, 1).multiply(multiply), new THREE.Vector2(0, 1).multiply(multiply)])
        geometry.faceVertexUvs[0].push([new THREE.Vector2(1, 0).multiply(multiply), new THREE.Vector2(0, 1).multiply(multiply), new THREE.Vector2(0, 0).multiply(multiply)])
      } else if (normal.x === -1) {
        face.materialIndex = add + 1
        face2.materialIndex = add + 1
        const miny = Math.min(a.y, b.y, c.y)
        const maxy = Math.max(a.y, b.y, c.y)
        const minz = Math.min(a.z, b.z, c.z)
        const maxz = Math.max(a.z, b.z, c.z)
        const multiply = new THREE.Vector2(maxz - minz, maxy - miny)
        geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0).multiply(multiply), new THREE.Vector2(1, 0).multiply(multiply), new THREE.Vector2(1, 1).multiply(multiply)])
        geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0).multiply(multiply), new THREE.Vector2(1, 1).multiply(multiply), new THREE.Vector2(0, 1).multiply(multiply)])
      } else if (normal.y === 1) {
        face.materialIndex = add + 2
        face2.materialIndex = add + 2
        const minx = Math.min(a.x, b.x, c.x)
        const maxx = Math.max(a.x, b.x, c.x)
        const minz = Math.min(a.z, b.z, c.z)
        const maxz = Math.max(a.z, b.z, c.z)
        const multiply = new THREE.Vector2(maxz - minz, maxx - minx)
        geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0).multiply(multiply), new THREE.Vector2(1, 0).multiply(multiply), new THREE.Vector2(1, 1).multiply(multiply)])
        geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0).multiply(multiply), new THREE.Vector2(1, 1).multiply(multiply), new THREE.Vector2(0, 1).multiply(multiply)])
      } else if (normal.y === -1) {
        face.materialIndex = add + 3
        face2.materialIndex = add + 3
        const minx = Math.min(a.x, b.x, c.x)
        const maxx = Math.max(a.x, b.x, c.x)
        const minz = Math.min(a.z, b.z, c.z)
        const maxz = Math.max(a.z, b.z, c.z)
        const multiply = new THREE.Vector2(maxx - minx, maxz - minz)
        geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0).multiply(multiply), new THREE.Vector2(1, 0).multiply(multiply), new THREE.Vector2(1, 1).multiply(multiply)])
        geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0).multiply(multiply), new THREE.Vector2(1, 1).multiply(multiply), new THREE.Vector2(0, 1).multiply(multiply)])
      } else if (normal.z === 1) {
        face.materialIndex = add + 4
        face2.materialIndex = add + 4
        const minx = Math.min(a.x, b.x, c.x)
        const maxx = Math.max(a.x, b.x, c.x)
        const miny = Math.min(a.y, b.y, c.y)
        const maxy = Math.max(a.y, b.y, c.y)
        const multiply = new THREE.Vector2(maxx - minx, maxy - miny)
        geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0).multiply(multiply), new THREE.Vector2(1, 0).multiply(multiply), new THREE.Vector2(1, 1).multiply(multiply)])
        geometry.faceVertexUvs[0].push([new THREE.Vector2(0, 0).multiply(multiply), new THREE.Vector2(1, 1).multiply(multiply), new THREE.Vector2(0, 1).multiply(multiply)])
      } else if (normal.z === -1) { // 여기 문제
        face.materialIndex = add + 5
        face2.materialIndex = add + 5
        const minx = Math.min(a.x, b.x, c.x)
        const maxx = Math.max(a.x, b.x, c.x)
        const miny = Math.min(a.y, b.y, c.y)
        const maxy = Math.max(a.y, b.y, c.y)
        const multiply = new THREE.Vector2(maxx - minx, maxy - miny)
        geometry.faceVertexUvs[0].push([new THREE.Vector2(1, 0).multiply(multiply), new THREE.Vector2(1, 1).multiply(multiply), new THREE.Vector2(0, 1).multiply(multiply)])
        geometry.faceVertexUvs[0].push([new THREE.Vector2(1, 0).multiply(multiply), new THREE.Vector2(0, 1).multiply(multiply), new THREE.Vector2(0, 0).multiply(multiply)])
      }
      geometry.faces.push(face)
      geometry.faces.push(face2)
      testGeometry.faces = []
    }

    for (const i in mesherData.not) {
      const data = mesherData.not[i]
      /**
       * @type {THREE.Mesh}
       */
      const mesh = BlockList.get(data.id).getMesh()
      const add = typestart[data.id]
      mesh.position.copy(data.position)
      mesh.updateMatrix()
      geometry.merge(mesh.geometry, mesh.matrix, add)
    }

    const mesh = new THREE.Mesh(geometry, materials)
    mesh.position.set(this.x, 0, this.z)
    this.mesh = mesh
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
