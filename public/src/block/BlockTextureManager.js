class BlockTextureManager {
  constructor () {
    this.textureLoader = new THREE.TextureLoader()
    this.microCache = new MicroCache()
  }

  load (texture) {
    return this.microCache.getSet(texture, this.textureLoader.load('./assets/blocks/' + texture + '.png'))
  }
}

module.exports = BlockTextureManager
