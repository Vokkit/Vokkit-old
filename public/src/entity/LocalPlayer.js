const Player = require('./Player')
const Location = require('../Location')
const Inventory = require('../inventory/Inventory')

class LocalPlayer extends Player {
  constructor (id, location, velocity, health = 20, name, type, inventory = new Inventory(4 * 9 + 5), gamemode = 0, selectedSlotId = 0, flying = false) {
    super(id, location, velocity, health, name, type, inventory, gamemode, selectedSlotId, flying)
    Vokkit.getClient().getScreenManager().getScreen('MainUIScreen').updateHealthBar(health)
  }

  teleport (location) {
    super.teleport(location)
    Vokkit.getClient().getScreenManager().getScreen('MainScreen').updateGroup(location)
  }

  static fromObject (object, socket) {
    return new LocalPlayer(object.id, new Location(Vokkit.getClient().getWorld(object.worldName), object.x, object.y, object.z, object.yaw, object.pitch), new THREE.Vector3(object.velocity[0], object.velocity[1], object.velocity[2]), object.health, object.name, object.type, Inventory.fromObject(object.inventory))
  }

  setHealth (health) {
    super.setHealth(health)
    Vokkit.getClient().getScreenManager().getScreen('MainUIScreen').updateHealthBar(health)
  }

  setGameMode (gamemode) {
    super.setGameMode(gamemode)
    Vokkit.getClient().getScreenManager().getScreen('MainUIScreen').updateHealthBar(this.getHealth())
  }
}

module.exports = LocalPlayer
