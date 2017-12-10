const materials = require('../Materials')

function checkImage (url, replace) {
  const image = new Image()
  image.src = url

  if (image.height == 0) {
    image.src = replace
  }

  return image
}

class BlockTextureManager {
  constructor () {
    this.materials = []
    this.textureLoader = new THREE.TextureLoader()

    const loop = async () => {
      for (const i in materials) {
        if (typeof materials[i].id === 'undefined' || materials[i].id === 0) continue

        const texture = await this.load(materials[i].getName())
        this.materials[materials[i].id] = new THREE.MeshBasicMaterial({
          map: texture,
          flatShading: true
        })

        console.log('load: ' + i)
        console.image(texture)
      }
    }

    loop()

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

  async load (blockName, option = '') {
    const texture = await this.getBlockImage(blockName, option)

    texture.anisotropy = 4
    texture.needsUpdate = true

    texture.magFilter = THREE.NearestFilter
    texture.minFilter = THREE.LinearMipMapLinearFilter

    return texture
  }

  async getBlockImage (blockName, option = '') {
    const image_normal = './assets/blocks/' + blockName + option + '.png'

    const image_front = checkImage('./assets/blocks/' + blockName + '_front' + option + '.png', image_normal)
    const image_back = checkImage('./assets/blocks/' + blockName + '_back' + option + '.png', image_normal)
    const image_top = checkImage('./assets/blocks/' + blockName + '_top' + option + '.png', image_normal)
    const image_bottom = checkImage('./assets/blocks/' + blockName + '_bottom' + option + '.png', image_normal)
    const image_side = checkImage('./assets/blocks/' + blockName + '_side' + option + '.png', image_normal)

    const canvas = document.getElementById('edit')
    const ctx = canvas.getContext('2d')

    canvas.width = 8 * 4
    canvas.height = 8 * 2

    const x = [8, 16, 0, 8, 16, 24]
    const y = [0, 0, 8, 8, 8, 8]
    const images = [image_top, image_bottom, image_side, image_front, image_side, image_back]

    for (let i = 0; i < 6; i++) {
      console.log(blockName + ' start: ' + i)
      
      await new Promise((resolve, reject) => {
        images[i].onload = () => {
          ctx.drawImage(images[i], x[i], y[i], 8, 8)
          resolve()
        }
      })

      console.log(blockName + ' end: ' + i)
    }

    const result = new Image()
    result.src = canvas.toDataURL()

    return new THREE.Texture(result)
  }
}

module.exports = BlockTextureManager
