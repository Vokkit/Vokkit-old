import Block from './block/Block'
import CulledMesher from './mesher/CulledMesher'

export default class Chunk {
  constructor (x, z, chunkData) {
    this.x = x
    this.z = z
    this.chunkData = chunkData
  }

  getBlock (position) {
    var x = Math.floor(position.x)
    var y = Math.floor(position.y)
    var z = Math.floor(position.z)
    if (typeof this.chunkData[x] === 'undefined') return new Block(position, 0)
    if (typeof this.chunkData[x][y] === 'undefined') return new Block(position, 0)
    return this.chunkData[x][y][z] || new Block(position, 0)
  }

  setBlock (block) {
    var x = Math.floor(block.position.x)
    var y = Math.floor(block.position.y)
    var z = Math.floor(block.position.z)
    if (typeof this.chunkData[x] === 'undefined') this.chunkData[x] = []
    if (typeof this.chunkData[x][y] === 'undefined') this.chunkData[x][y] = []
    this.chunkData[x][y][z] = block
    Vokkit.getClient().getSceneManager().reloadChunk(this)
  }

  toMesherData () {
    var high = [16, 256, 16]
    var low = [0, 0, 0]
    var dims = [high[0] - low[0], high[1] - low[1], high[2] - low[2]]
    var volume = new Int32Array(dims[0] * dims[1] * dims[2])
    var count = 0
    var pos = new THREE.Vector3()
    for (var k = low[2]; k < high[2]; k++) {
      for (var j = low[1]; j < high[1]; j++) {
        for (var i = low[0]; i < high[0]; i++) {
          volume[count] = this.getBlock(pos.set(this.x + i, j, this.z + k)).id
          count++
        }
      }
    }
    return {
      volume: volume,
      dims: dims
    }
  }

  mesher () {
    var data = this.toMesherData()
    var result = CulledMesher(data.volume, data.dims)

    var geometry = new THREE.Geometry()

    for (var i in result.vertices) {
      geometry.vertices.push(new THREE.Vector3(result.vertices[i][0], result.vertices[i][1], result.vertices[i][2]))
    }

    var uvgeometry = blockTextureManager.uvsGeometry(new THREE.BoxGeometry(1, 1, 1))
        // geometry.faceVertexUvs[0].push(new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.25, 0), new THREE.Vector2(0, 0), new THREE.Vector2(0, 0.5));

    var blockPosition = new THREE.Vector3()

    var xmuvs = [new THREE.Vector2(0.25, 0), new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0, 0.5), new THREE.Vector2(0, 0)]

        // var xpuvs = [new THREE.Vector2(0.5, 0), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.5, 0.5)];
        // var xpuvs = [new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.5, 0)];
    var xpuvs = [new THREE.Vector2(0.25, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.25, 0.5)]

        // var ymuvs = [new THREE.Vector2(0.5, 1), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.25, 1)];
    var ymuvs = [new THREE.Vector2(0.25, 1), new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 1)]

        // var ypuvs = [new THREE.Vector2(0.75, 1), new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 1)];
        // var ypuvs = [new THREE.Vector2(0.5, 1), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.75, 1)];
    var ypuvs = [new THREE.Vector2(0.75, 1), new THREE.Vector2(0.5, 1), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.75, 0.5)]

        // var zmuvs = [new THREE.Vector2(0.75, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.75, 0.5)];
        // var zmuvs = [new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.75, 0)];
    var zmuvs = [new THREE.Vector2(0.5, 0), new THREE.Vector2(0.75, 0), new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.5, 0.5)]

    var zpuvs = [new THREE.Vector2(1, 0), new THREE.Vector2(1, 0.5), new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.75, 0)]

    for (var i in result.faces) {
      var faces = result.faces[i]
      if (faces.length == 5) {
        var face = new THREE.Face3(faces[0], faces[1], faces[2])
        var face2 = new THREE.Face3(faces[0], faces[2], faces[3])
                // face가 어느 방향인지 검출.
        var minx = geometry.vertices[faces[0]].x
        if (geometry.vertices[faces[1]].x < minx) minx = geometry.vertices[faces[1]].x
        if (geometry.vertices[faces[2]].x < minx) minx = geometry.vertices[faces[2]].x
        if (geometry.vertices[faces[3]].x < minx) minx = geometry.vertices[faces[3]].x
        var miny = geometry.vertices[faces[0]].y
        if (geometry.vertices[faces[1]].y < miny) miny = geometry.vertices[faces[1]].y
        if (geometry.vertices[faces[2]].y < miny) miny = geometry.vertices[faces[2]].y
        if (geometry.vertices[faces[3]].y < miny) miny = geometry.vertices[faces[3]].y
        var minz = geometry.vertices[faces[0]].z
        if (geometry.vertices[faces[1]].z < minz) minz = geometry.vertices[faces[1]].z
        if (geometry.vertices[faces[2]].z < minz) minz = geometry.vertices[faces[2]].z
        if (geometry.vertices[faces[3]].z < minz) minz = geometry.vertices[faces[3]].z

        minx += this.x
        minz += this.z

        if (geometry.vertices[faces[0]].x == geometry.vertices[faces[1]].x && geometry.vertices[faces[1]].x == geometry.vertices[faces[2]].x) {
                    // x 방향. 블럭 확인해서 어느 방향인지 재검출
          var block = this.getBlock(blockPosition.set(minx, miny, minz))
          if (block.id == 0) {
                        // x- 방향에 블럭있음.
            geometry.faceVertexUvs[0].push([xmuvs[0], xmuvs[1], xmuvs[2]])
            geometry.faceVertexUvs[0].push([xmuvs[0], xmuvs[2], xmuvs[3]])
            block = this.getBlock(blockPosition.set(minx - 1, miny, minz))
            face.materialIndex = block.id
            face2.materialIndex = block.id
          } else {
                        // x+ 방향에 블럭있음. 이것도 거꾸로 뒤집힘.
            geometry.faceVertexUvs[0].push([xpuvs[0], xpuvs[1], xpuvs[2]])
            geometry.faceVertexUvs[0].push([xpuvs[0], xpuvs[2], xpuvs[3]])
            face.materialIndex = block.id
            face2.materialIndex = block.id
          }
        } else if (geometry.vertices[faces[0]].y == geometry.vertices[faces[1]].y && geometry.vertices[faces[1]].y == geometry.vertices[faces[2]].y) {
                    // y 방향. 블럭 확인해서 어느 방향인지 재검출
          var block = this.getBlock(blockPosition.set(minx, miny, minz))
          if (block.id == 0) {
                        // y- 방향에 블럭있음. 이건 거꾸로 뒤집힘
            geometry.faceVertexUvs[0].push([ymuvs[0], ymuvs[1], ymuvs[2]])
            geometry.faceVertexUvs[0].push([ymuvs[0], ymuvs[2], ymuvs[3]])
            block = this.getBlock(blockPosition.set(minx, miny - 1, minz))
            face.materialIndex = block.id
            face2.materialIndex = block.id
          } else {
                        // y+ 방향에 블럭있음. 이건 거꾸로 뒤집힘
            geometry.faceVertexUvs[0].push([ypuvs[0], ypuvs[1], ypuvs[2]])
            geometry.faceVertexUvs[0].push([ypuvs[0], ypuvs[2], ypuvs[3]])
            face.materialIndex = block.id
            face2.materialIndex = block.id
          }
        } else if (geometry.vertices[faces[0]].z == geometry.vertices[faces[1]].z && geometry.vertices[faces[1]].z == geometry.vertices[faces[2]].z) {
                    // z 방향. 블럭 확인해서 어느 방향인지 재검출
          var block = this.getBlock(blockPosition.set(minx, miny, minz))
          if (block.id == 0) {
                        // z- 방향에 블럭있음. 이건 거꾸로 뒤집힘
            geometry.faceVertexUvs[0].push([zmuvs[0], zmuvs[1], zmuvs[2]])
            geometry.faceVertexUvs[0].push([zmuvs[0], zmuvs[2], zmuvs[3]])
            block = this.getBlock(blockPosition.set(minx, miny, minz - 1))
            face.materialIndex = block.id
            face2.materialIndex = block.id
          } else {
                        // z+ 방향에 블럭있음.
            geometry.faceVertexUvs[0].push([zpuvs[0], zpuvs[1], zpuvs[2]])
            geometry.faceVertexUvs[0].push([zpuvs[0], zpuvs[2], zpuvs[3]])
            face.materialIndex = block.id
            face2.materialIndex = block.id
          }
        }
        geometry.faces.push(face)
        geometry.faces.push(face2)
      }
    }

    var materials = Vokkit.getClient().getBlockTextureManager().getTextures()

    mesh = new THREE.Mesh(geometry, materials)
    mesh.position.set(this.x, 0, this.z)
    return mesh
  }

  containsPosition (position) {
    return position.x >= this.x && position.x < this.x + 16 && position.z >= this.z && position.z < this.z + 16
  }

  getLastMesh () {
    this.mesh
  }
}
