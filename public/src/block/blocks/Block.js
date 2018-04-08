/*
 * This block class is just data value, NOT REAL WORLD BLOCK!
 */
const SoftwareRenderer = require("three-software-renderer")

const BlockShape = require('./BlockShape.js')
const BlockTextureManager = require('../BlockTextureManager.js')

function renderPreview(mesh) {
  const camera = new THREE.OrthographicCamera(1, -1, 1, -1, 1, 1000)
  camera.position.x = 2
  camera.position.y = -2
  camera.position.z = 2
  camera.lookAt(new THREE.Vector3(0, 0, 0))

  mesh.position.x = 0
  mesh.position.y = 0
  mesh.position.z = 0

  const scene = new THREE.Scene()
  scene.add(mesh)

  const renderer = new THREE.WebGLRenderer({ preserveDrawingBuffer: true, alpha: true })
  renderer.setSize(256, 256)
  renderer.setClearColor(0x000000, 0)
  renderer.render(scene, camera)

  return renderer.domElement.toDataURL()
}

class Block {
  constructor(id, data, texture, name, shape = new BlockShape()) {
    this.texture = texture
    this.id = id
    this.data = data
    this.shape = shape
    this.name = name

    this.mesh = null
    this.preview = null

    if (shape != null) {
      let i = 0

      for (const s of this.shape.getShapes()) {
        const g = new THREE.BoxGeometry(...s.getBoxSize())

        const m = this.texture[i].map(e => {
          const texture = BlockTextureManager.load(e)
          texture.magFilter = THREE.NearestFilter
          texture.minFilter = THREE.LinearMipMapLinearFilter
          texture.wrapS = THREE.RepeatWrapping
          texture.wrapT = THREE.RepeatWrapping

          return new THREE.MeshBasicMaterial({
            map: texture
          })
        })

        const mesh = new THREE.Mesh(g, m)
        const bias = s.getAverageOffset()
        mesh.position.x = s.getBoxOffset()[0] + bias[0]
        mesh.position.y = s.getBoxOffset()[1] + bias[1]
        mesh.position.z = s.getBoxOffset()[2] + bias[2]

        mesh.castShadow = true
        mesh.receiveShadow = false

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

      setTimeout(() => {
        this.preview = renderPreview(this.mesh.clone())
      }, 500)
    }
  }

  getId() {
    return this.id
  }

  getData() {
    return this.data
  }

  getName() {
    return this.name
  }

  getTexture() {
    return this.texture
  }

  getOffset() {
    return this.offset
  }

  getDropItem() {
    return this.id
  }

  getHardness() {
    return 1.0
  }

  getResistance() {
    return 1.0
  }

  getToolType() {
    return null
  }

  getLight() {
    return 0
  }

  isCubeShape() {
    return true
  }

  isSolid() {
    return true
  }

  isBreakable() {
    return true
  }

  isBurn() {
    return false
  }

  getMesh() {
    return this.mesh.clone()
  }
}

module.exports = Block
