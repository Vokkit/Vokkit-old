const Entity = require('./Entity')
const PlayerRenderer = require('../renderer/PlayerRenderer')
const Inventory = require('../inventory/Inventory')

class Player extends Entity {
  constructor (id, location, velocity, name, type, inventory = new Inventory(54), gamemode = 0) {
    super(id, location, velocity)
    this.name = name
    this.type = type
    this.renderer = new PlayerRenderer('steve', this)
    this.inventory = inventory
    this.gamemode = gamemode
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

  getGameMode() {
    return this.gamemode
  }

  setGameMode(gamemode) {
    this.gamemode = gamemode
  }

  toObject() {
    return {
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
      gamemode: this.gamemode
    }
  }

  static fromObject(object, socket) {
    return new Player(object.name, new Location(Vokkit.getServer().getWorld(object.worldName), object.x, object.y, object.z, object.yaw, object.pitch), new THREE.Vector3(object.velocity[0], object.velocity[1], object.velocity[2]), object.name, socket, object.type, Inventory.fromObject(object.inventory))
  }

}

module.exports = Player
