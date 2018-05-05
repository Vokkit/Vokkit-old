const Block = require('./block/Block')
const BlockList = require('./block/BlockList.js')
const GreedyMesher = require('./mesher/GreedyMesher')
const BufferGeometryUtils = require('./util/BufferGeometryUtils')

const high = [16, 256, 16]
const low = [0, 0, 0]
const dims = [high[0] - low[0], high[1] - low[1], high[2] - low[2]]

const plane = (() => {
  const px = new THREE.PlaneBufferGeometry(1, 1)
  px.attributes.uv.array[1] = 0.5
  px.attributes.uv.array[3] = 0.5
  px.rotateY(Math.PI * 0.5)
  px.translate(0.5, 0, 0)

  const mx = new THREE.PlaneBufferGeometry(1, 1)
  mx.attributes.uv.array[1] = 0.5
  mx.attributes.uv.array[3] = 0.5
  mx.rotateY(-Math.PI * 0.5)
  mx.translate(-0.5, 0, 0)

  const py = new THREE.PlaneBufferGeometry(1, 1)
  py.attributes.uv.array[5] = 0.5
  py.attributes.uv.array[7] = 0.5
  py.rotateX(-Math.PI / 2)
  py.translate(0, 0.5, 0)

  const my = new THREE.PlaneBufferGeometry(1, 1)
  my.attributes.uv.array[5] = 0.5
  my.attributes.uv.array[7] = 0.5
  my.rotateX(Math.PI / 2)
  my.translate(0, -0.5, 0)

  const pz = new THREE.PlaneBufferGeometry(1, 1)
  pz.attributes.uv.array[1] = 0.5
  pz.attributes.uv.array[3] = 0.5
  pz.translate(0, 0, 0.5)

  const mz = new THREE.PlaneBufferGeometry(1, 1)
  mz.attributes.uv.array[1] = 0.5
  mz.attributes.uv.array[3] = 0.5
  mz.rotateY(Math.PI)
  mz.translate(0, 0, -0.5)

  return [px, mx, py, my, pz, mz]
})()

class Chunk {
  constructor(x, z, chunkData) {
    this.x = x
    this.z = z
    this.chunkData = chunkData
  }

  getBlock(position) {
    const x = Math.floor(position.x)
    const y = Math.floor(position.y)
    const z = Math.floor(position.z)
    if (typeof this.chunkData[x] === 'undefined') return new Block(position.clone(), BlockList.AIR)
    if (typeof this.chunkData[x][y] === 'undefined') return new Block(position.clone(), BlockList.AIR)

    return this.chunkData[x][y][z] || new Block(position.clone(), BlockList.AIR)
  }

  setBlock(block) {
    const x = Math.floor(block.position.x)
    const y = Math.floor(block.position.y)
    const z = Math.floor(block.position.z)
    if (typeof this.chunkData[x] === 'undefined') this.chunkData[x] = []
    if (typeof this.chunkData[x][y] === 'undefined') this.chunkData[x][y] = []
    this.chunkData[x][y][z] = block
    Vokkit.getClient().getScreenManager().getScreen('MainScreen').reloadChunk(this)
  }

  toMesherData() {
    const volume = []
    const not = []
    const coord = []
    const pos = new THREE.Vector3()
    for (let k = low[2]; k < high[2]; k++) {
      for (let j = low[1]; j < high[1]; j++) {
        for (let i = low[0]; i < high[0]; i++) {
          const blockId = this.getBlock(pos.set(this.x + i, j, this.z + k)).getId()
          if(blockId !== undefined && blockId !== 0) {
            coord.push(new THREE.Vector3(i, j, k))
            volume.push(blockId)
          } else {
            volume.push(0)
            not.push({
              position: pos.set(this.x + i, j, this.z + k).clone(),
              id: blockId
            })
          }
        }
      }
    }

    return { volume, dims, not, coord }
  }

  mesher() {
    const mesherData = this.toMesherData()
    //const result = GreedyMesher.optimize(mesherData.volume, mesherData.dims)
    const testGeometry = new THREE.Geometry()

    /*for (const i in result.vertices) {
      testGeometry.vertices.push(new THREE.Vector3(result.vertices[i][0], result.vertices[i][1], result.vertices[i][2]))
    }*/

    let materials = []
    const typestart = []
    const blocks = BlockList.getAllBlocks()
    for (const i in blocks) {
      if (i === '0') continue
      typestart[i] = materials.length
      materials = materials.concat(blocks[i].getMesh().material)
    }
    
    let matrix = new THREE.Matrix4()
    const geometries = []
    for (const i in mesherData.coord) {
      /*const faces = result.faces[i]
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
      normal.x = Math.round(normal.x)
      normal.y = Math.round(normal.y)
      normal.z = Math.round(normal.z)

      const minx = Math.min(a.x, b.x, c.x)
      const maxx = Math.max(a.x, b.x, c.x)
      const miny = Math.min(a.y, b.y, c.y)
      const maxy = Math.max(a.y, b.y, c.y)
      const minz = Math.min(a.z, b.z, c.z)
      const maxz = Math.max(a.z, b.z, c.z)*/

      matrix.setPosition(mesherData.coord[i])
      
      //if (normal.x === 1) {
        geometries.push(plane[0].clone().applyMatrix(matrix))
      //} else if (normal.x === -1) {
        geometries.push(plane[1].clone().applyMatrix(matrix))
      //} else if (normal.y === 1) {
        geometries.push(plane[2].clone().applyMatrix(matrix))
      //} else if (normal.y === -1) {
        geometries.push(plane[3].clone().applyMatrix(matrix))
      //} else if (normal.z === 1) {
        geometries.push(plane[4].clone().applyMatrix(matrix))
      //} else if (normal.z === -1) {
        geometries.push(plane[5].clone().applyMatrix(matrix))
      //}
    }

    const geometry = BufferGeometryUtils.mergeBufferGeometries(geometries)

    const mesh = new THREE.Mesh(geometry, new THREE.MeshLambertMaterial({ color: 0x4d4d4d }) /*materials*/)
    mesh.position.set(this.x, 0, this.z)
    this.mesh = mesh

    return mesh
  }

  containsPosition(position) {
    return position.x >= this.x && position.x < this.x + 16 && position.z >= this.z && position.z < this.z + 16
  }

  getLastMesh() {
    return this.mesh
  }
}

module.exports = Chunk