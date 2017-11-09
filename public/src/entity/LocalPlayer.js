const Player = require('./Player')
const Location = require('../Location')
const Inventory = require('../inventory/Inventory')

class LocalPlayer extends Player {
  teleport(location) {
    super.teleport(location)
    Vokkit.getClient().getSceneManager().updateGroup(location)
  }

  static fromObject(object, socket) {
    return new Player(object.id, new Location(Vokkit.getClient().getWorld(object.worldName), object.x, object.y, object.z, object.yaw, object.pitch), new THREE.Vector3(object.velocity[0], object.velocity[1], object.velocity[2]), object.name, object.type, Inventory.fromObject(object.inventory))
  }
}

module.exports = LocalPlayer