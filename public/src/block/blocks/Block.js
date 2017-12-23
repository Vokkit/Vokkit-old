/*
 * This block class is just data value, NOT REAL WORLD BLOCK!
 */

const BlockShape = require('./BlockShape.js')
const BlockTextureManager = require('../BlockTextureManager.js')

class Block {
  constructor (id, data, texture, name, shape = new BlockShape()) {
    this.texture = texture
    this.id = id
    this.data = data
    this.shape = shape
    this.name = name

    this.mesh = null

    if (shape != null) {
      let i = 0

      for (const s of this.shape.getShapes()) {
        const g = new THREE.BoxGeometry(...s.getBoxSize())

        const m = this.texture[i].map(e => {
          const texture = BlockTextureManager.load(e)
          texture.magFilter = THREE.NearestFilter
          texture.minFilter = THREE.LinearMipMapLinearFilter

          return new THREE.MeshBasicMaterial({
            map: texture
          })
        })

        const mesh = new THREE.Mesh(g, m)
        const bias = s.getAverageOffset()
        mesh.position.x = s.getBoxOffset()[0] + bias[0]
        mesh.position.y = s.getBoxOffset()[1] + bias[1]
        mesh.position.z = s.getBoxOffset()[2] + bias[2]

        if (i == 0) {
          this.mesh = mesh
        } else {
          const geometry = new THREE.Geometry()

          mesh.updateMatrix()
          geometry.merge(mesh.geometry, mesh.matrix)

          this.mesh.updateMatrix()
          geometry.merge(this.mesh.geometry, this.mesh.matrix, 1)

          this.mesh = new THREE.Mesh(geometry, [...m, ...this.mesh.material])
          this.mesh.geometry.computeFaceNormals()
          this.mesh.geometry.computeVertexNormals()
        }

        i++
      }
    }
  }

  getId () {
    return this.id
  }

  getData () {
    return this.data
  }

  getName () {
    return this.name
  }

  getTexture () {
    return this.texture
  }

  getOffset () {
    return this.offset
  }

  getDropItem () {
    return this.id
  }

  getHardness () {
    return 1.0
  }

  getResistance () {
    return 1.0
  }

  getToolType () {
    return null
  }

  getLight () {
    return 0
  }

  isCubeShape () {
    return true
  }

  isSolid () {
    return true
  }

  isBreakable () {
    return true
  }

  isBurn () {
    return false
  }

  getMesh () {
    return this.mesh.clone()
  }
}

module.exports = Block
