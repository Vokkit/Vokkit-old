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
    this.Uvs0 = [new THREE.Vector2(0, 0.5), new THREE.Vector2(0, 0), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.25, 0.5)]
    this.Uvs1 = [new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.5, 0.5)]
    this.Uvs2 = [new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 1), new THREE.Vector2(0.25, 1)]
    this.Uvs3 = [new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.75, 1), new THREE.Vector2(0.5, 1)]
    this.Uvs4 = [new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.75, 0), new THREE.Vector2(0.75, 0.5)]
    this.Uvs5 = [new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.75, 0), new THREE.Vector2(1, 0), new THREE.Vector2(1, 0.5)]
  }

  getTextures () {
    return this.materials.slice()
  }

  getUvsGeometry (geometry) {
    
    geometry.faceVertexUvs[0][0] = [this.Uvs0[0], this.Uvs0[1], this.Uvs0[3]]
    geometry.faceVertexUvs[0][1] = [this.Uvs0[1], this.Uvs0[2], this.Uvs0[3]]
    geometry.faceVertexUvs[0][2] = [this.Uvs1[0], this.Uvs1[1], this.Uvs1[3]]
    geometry.faceVertexUvs[0][3] = [this.Uvs1[1], this.Uvs1[2], this.Uvs1[3]]

    geometry.faceVertexUvs[0][4] = [this.Uvs2[0], this.Uvs2[1], this.Uvs2[3]]
    geometry.faceVertexUvs[0][5] = [this.Uvs2[1], this.Uvs2[2], this.Uvs2[3]]

    geometry.faceVertexUvs[0][6] = [this.Uvs3[0], this.Uvs3[1], this.Uvs3[3]]
    geometry.faceVertexUvs[0][7] = [this.Uvs3[1], this.Uvs3[2], this.Uvs3[3]]

    geometry.faceVertexUvs[0][8] = [this.Uvs4[0], this.Uvs4[1], this.Uvs4[3]]
    geometry.faceVertexUvs[0][9] = [this.Uvs4[1], this.Uvs4[2], this.Uvs4[3]]

    geometry.faceVertexUvs[0][10] = [this.Uvs5[0], this.Uvs5[1], this.Uvs5[3]]
    geometry.faceVertexUvs[0][11] = [this.Uvs5[1], this.Uvs5[2], this.Uvs5[3]]
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
