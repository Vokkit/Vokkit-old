const Player = require('./Player')
const Location = require('../Location')
const Inventory = require('../inventory/Inventory')

class LocalPlayer extends Player {
  teleport (location) {
    super.teleport(location)
    Vokkit.getClient().getScreenManager().getScreen('MainScreen').updateGroup(location)
  }

  static fromObject (object, socket) {
    return new LocalPlayer(object.id, new Location(Vokkit.getClient().getWorld(object.worldName), object.x, object.y, object.z, object.yaw, object.pitch), new THREE.Vector3(object.velocity[0], object.velocity[1], object.velocity[2]), object.health, object.name, object.type, Inventory.fromObject(object.inventory))
  }

  setHealth (health) {
    super.setHealth(health)
    Vokkit.getClient().getUIManager().updateHealthBar()
  }
}

module.exports = LocalPlayer
