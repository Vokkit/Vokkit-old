const materials = require('../Materials')

class BlockTextureManager {
  constructor () {
    this.materials = []
    this.textureLoader = new THREE.TextureLoader()
    for (const i in materials) {
      if (typeof materials[i].id === 'undefined' || materials[i].id === 0) continue
      this.materials[materials[i].id] = new THREE.MeshBasicMaterial({
        map: this.load(materials[i].getName()),
        overdraw: true
      })
    }
  }

  getTextures () {
    return this.materials.slice()
  }

  getUvsGeometry (geometry) {
    const Uvs0 = [new THREE.Vector2(0, 0.5), new THREE.Vector2(0, 0), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.25, 0.5)]
    const Uvs1 = [new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.5, 0.5)]
    const Uvs2 = [new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 1), new THREE.Vector2(0.25, 1)]
    const Uvs3 = [new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.75, 1), new THREE.Vector2(0.5, 1)]
    const Uvs4 = [new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.75, 0), new THREE.Vector2(0.75, 0.5)]
    const Uvs5 = [new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.75, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 0.5)]
    geometry.faceVertexUvs[0][0] = [Uvs0[0], Uvs0[1], Uvs0[3]]
    geometry.faceVertexUvs[0][1] = [Uvs0[1], Uvs0[2], Uvs0[3]]
    geometry.faceVertexUvs[0][2] = [Uvs1[0], Uvs1[1], Uvs1[3]]
    geometry.faceVertexUvs[0][3] = [Uvs1[1], Uvs1[2], Uvs1[3]]

    geometry.faceVertexUvs[0][4] = [Uvs2[0], Uvs2[1], Uvs2[3]]
    geometry.faceVertexUvs[0][5] = [Uvs2[1], Uvs2[2], Uvs2[3]]

    geometry.faceVertexUvs[0][6] = [Uvs3[0], Uvs3[1], Uvs3[3]]
    geometry.faceVertexUvs[0][7] = [Uvs3[1], Uvs3[2], Uvs3[3]]

    geometry.faceVertexUvs[0][8] = [Uvs4[0], Uvs4[1], Uvs4[3]]
    geometry.faceVertexUvs[0][9] = [Uvs4[1], Uvs4[2], Uvs4[3]]

    geometry.faceVertexUvs[0][10] = [Uvs5[0], Uvs5[1], Uvs5[3]]
    geometry.faceVertexUvs[0][11] = [Uvs5[1], Uvs5[2], Uvs5[3]]
    return geometry
  }

  load (blockName) {
    const texture = this.textureLoader.load('/assets/blocks/' + blockName + '.png')
    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.LinearMipMapLinearFilter
    return texture
  }
}

module.exports = BlockTextureManager
