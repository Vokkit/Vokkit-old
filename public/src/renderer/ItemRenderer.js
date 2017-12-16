const Renderer = require('./Renderer')

class ItemRenderer extends Renderer {
  constructor (skinPath, item) {
    super(skinPath)
    this.item = item
    this.geometry = new THREE.BoxGeometry(0.25, 0.25, 0.25)
    this.geometry = Vokkit.getClient().getBlockTextureManager().getUvsGeometry(this.geometry)
    this.mesh = new THREE.Mesh(this.geometry, this.material)
    const group = Vokkit.getClient().getScreenManager().getScreen('MainScreen').getGroup()
    group.add(this.mesh)
  }

  updatePosition (location, velocity) {
    this.bodyMesh.position.set(location.x, location.y + 0.125, location.z)
  }

  checkMove (location, velocity) {
    const result = super.checkMove(location, velocity, [this.mesh], this.item.getLocation().getWorld())
    this.item.teleport(this.player.getLocation().add(result.x, result.y, result.z))
    if (result.yCollision) this.item.setVelocity(velocity.multiply(new THREE.Vector3(0.5, 0.7, 0.5)))
    else this.item.setVelocity(velocity.multiplyScalar(0.7))
  }

  remove () {
    const group = Vokkit.getClient().getScreenManager().getScreen('MainScreen').getGroup()
    group.remove(this.mesh)
  }
}

module.exports = ItemRenderer
