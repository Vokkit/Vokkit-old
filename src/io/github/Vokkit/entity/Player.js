const Entity = require('./Entity.js')
const Inventory = require('../inventory/Inventory')

class Player extends Entity {
  constructor (id, location, velocity, health = 20, name, socket, type, inventory = new Inventory(54), gameMode = 0, selectedSlotId = 0, flying = false) {
    super(id, location, velocity, health)

    this.name = name
    this.socket = socket
    this.type = type
    this.inventory = inventory
    this.gameMode = gameMode
    this.selectedSlotId = selectedSlotId
    this.flying = false
  }

  getName () {
    return this.name
  }

  getSocket () {
    return this.socket
  }

  getAddress () {
    return this.socket.request.connection._peername.address
  }

  getPort () {
    return this.socket.request.connection._peername.port
  }

  getType () {
    return this.type
  }

  setName (name) {
    this.name = name
    Vokkit.getServer().getSocketServer().emit('playerData', {
      id: this.getId(),
      name: name
    })
  }

  setSocket (socket) {
    this.socket = socket
  }

  setType (type) {
    this.type = type
  }

  sendMessage (message) {
    this.getSocket().emit('chat', {
      id: this.getId(),
      message: message.toString()
    })

    // Vokkit.getServer().getLogger().info(sender + ' tell ' + message + ' to ' + this.name)
  }

  getInventory () {
    return this.inventory
  }

  setHealth (health) {
    super.setHealth(health)
    Vokkit.getServer().getSocketServer().emit('playerData', {
      id: this.getId(),
      health: health
    })
  }

  openInventory (inventory) {
    this.socket.emit('inventoryOpen', {
      inventory: inventory.toObject()
    })
  }

  getGameMode () {
    return this.gameMode
  }

  setGameMode (gameMode) {
    this.gameMode = gameMode
    Vokkit.getServer().getSocketServer().emit('playerData', {
      id: this.getId(),
      gameMode: gameMode
    })
  }

  getSelectedSlotId () {
    return this.selectedSlotId
  }

  setSelectedSlotId (selectedSlotId) {
    this.selectedSlotId = selectedSlotId
    Vokkit.getServer().getSocketServer().emit('playerData', {
      id: this.getId(),
      selectedSlotId: selectedSlotId
    })
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
      gameMode: this.gameMode,
      selectedSlotId: this.selectedSlotId,
      flying: this.flying
    }
  }

  static fromObject (object, socket) {
    return new Player(object.id, new Location(Vokkit.getServer().getWorld(object.worldName), object.x, object.y, object.z, object.yaw, object.pitch), new THREE.Vector3(object.velocity[0], object.velocity[1], object.velocity[2]), object.health, object.name, socket, object.type, Inventory.fromObject(object.inventory), object.selectedSlotId, object.flying)
  }
}

module.exports = Player
