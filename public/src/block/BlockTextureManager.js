let instance = null

class BlockTextureManager {
  constructor () {
    this.textureLoader = new THREE.TextureLoader()
    this.microCache = new MicroCache()
  }

  load (texture) {
    return this.microCache.getSet(texture, this.textureLoader.load('./assets/blocks/' + texture + '.png'))
  }

  static load (texture) {
    if (instance == null)
      instance = new BlockTextureManager()

    return instance.load(texture)
  }
}

module.exports = BlockTextureManager
