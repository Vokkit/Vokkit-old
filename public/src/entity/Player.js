const Entity = require('./Entity')
const PlayerRenderer = require('../renderer/PlayerRenderer')
const Inventory = require('../inventory/Inventory')

class Player extends Entity {
  constructor (id, location, velocity, name, isLocalPlayer, type) {
    super(id, location, velocity)
    this.name = name
    this.isLocalPlayer = isLocalPlayer
    this.type = type
    this.renderer = new PlayerRenderer('steve', this)
    this.inventory = new Inventory(54)
    if (!global.bodies) global.bodies = []
  }

  getEyeLocation () {
    const location = this.getLocation()
    location.add(0, 1.8, 0)
    return location
  }

  getName () {
    return this.name
  }

  getType () {
    return this.type
  }

  teleport (location) {
    super.teleport(location)
    if (this.isLocalPlayer) {
      Vokkit.getClient().getSceneManager().updateGroup(location)
    }
  }

  setName (name) {
    this.name = name
  }

  setType (type) {
    this.type = type
  }

  getInventory () {
    return this.inventory
  }

  openInventory (inventory) {
    // TODO: UI 작업
  }
}

module.exports = Player
