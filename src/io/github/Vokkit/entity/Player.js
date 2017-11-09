const Entity = require('./Entity.js')
const Inventory = require('../inventory/Inventory')

const LocalPlayer = require('./LocalPlayer')

class Player extends Entity {
  constructor(id, location, velocity, name, socket, type, inventory = new Inventory(54), gamemode = 0) {
    super(id, location, velocity)

    this.name = name
    this.socket = socket
    this.type = type
    this.inventory = inventory
    this.gamemode = gamemode
  }

  getName() {
    return this.name
  }

  getSocket() {
    return this.socket
  }

  getAddress() {
    return this.socket.request.connection._peername.address
  }

  getPort() {
    return this.socket.request.connection._peername.port
  }

  getType() {
    return this.type
  }

  setName(name) {
    this.name = name
  }

  setSocket(socket) {
    this.socket = socket
  }

  setType(type) {
    this.type = type
  }

  sendMessage(sender, message, format = '<%s> %s\n') {
    this.getSocket().emit('chat', {
      id: this.getId(),
      sender: sender,
      message: message.toString(),
      format: format
    })

    Vokkit.getServer().getLogger().info(sender + ' tell ' + message + ' to ' + this.name)
  }

  getInventory() {
    return this.inventory
  }

  openInventory(inventory) {
    this.socket.emit('inventoryOpen', {
      inventory: inventory.toObject()
    })
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
    if (object.id == socket.id) return new LocalPlayer(object.id, new Location(Vokkit.getServer().getWorld(object.worldName), object.x, object.y, object.z, object.yaw, object.pitch), new THREE.Vector3(object.velocity[0], object.velocity[1], object.velocity[2]), object.name, socket, object.type, Inventory.fromObject(object.inventory))
    return new Player(object.id, new Location(Vokkit.getServer().getWorld(object.worldName), object.x, object.y, object.z, object.yaw, object.pitch), new THREE.Vector3(object.velocity[0], object.velocity[1], object.velocity[2]), object.name, socket, object.type, Inventory.fromObject(object.inventory))
  }
}

module.exports = Player
