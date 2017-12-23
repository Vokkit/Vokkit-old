const Entity = require('./Entity')
const PlayerRenderer = require('../renderer/PlayerRenderer')
const Inventory = require('../inventory/Inventory')
const Location = require('../Location')

class Player extends Entity {
  constructor (id, location, velocity, health = 20, name, type, inventory = new Inventory(4 * 9 + 5), gamemode = 0, selectedSlotId = 0, flying = false) {
    super(id, location, velocity, health)
    this.name = name
    this.type = type
    this.renderer = new PlayerRenderer('skins/steve.png', this)
    this.inventory = inventory
    this.gamemode = gamemode
    this.selectedSlotId = selectedSlotId
    this.flying = flying
    this.onGround = false
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

  getGameMode () {
    return this.gamemode
  }

  setGameMode (gamemode) {
    this.gamemode = gamemode
  }

  getSelectedSlotId () {
    return this.selectedSlotId
  }

  setSelectedSlotId (selectedSlotId) {
    this.selectedSlotId = selectedSlotId
  }

  isFlying () {
    return this.flying
  }

  setFlying (flying) {
    this.flying = flying
    console.log(flying)
  }

  isOnGround () {
    return this.onGround
  }

  toObject () {
    return {
      health: this.health,
      name: this.name,

      x: this.location.x,
      y: this.location.y,
      z: this.location.z,

      yaw: this.location.yaw,
      pitch: this.location.pitch,

      velocity: [this.velocity.x, this.velocity.y, this.velocity.z],

      id: this.id,
      worldName: this.location.world.getWorldName(),
      type: this.type,
      inventory: this.inventory.toObject(),
      gamemode: this.gamemode,
      selectedSlotId: this.selectedSlotId,
      flying: this.flying
    }
  }

  static fromObject (object, socket) {
    return new Player(object.id, new Location(Vokkit.getClient().getWorld(object.worldName), object.x, object.y, object.z, object.yaw, object.pitch), new THREE.Vector3(object.velocity[0], object.velocity[1], object.velocity[2]), object.health, object.name, object.type, Inventory.fromObject(object.inventory), object.selectedSlotId, object.flying)
  }
}

module.exports = Player
