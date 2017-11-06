class Renderer {
  constructor (skinPath) {
    this.skinPath = skinPath
    if (typeof skinPath === 'string') {
      const textureLoader = new THREE.TextureLoader()
      this.texture = textureLoader.load(`/assets/skins/${skinPath}.png`)
      this.texture.magFilter = THREE.NearestFilter
      this.texture.minFilter = THREE.LinearMipMapLinearFilter
      this.material = new THREE.MeshBasicMaterial({
        map: this.texture,
        overdraw: true
      })
    }
  }
}

module.exports = Renderer
