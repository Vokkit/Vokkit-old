const Entity = require('./Entity.js')
const Inventory = require('../inventory/Inventory')

class Player extends Entity {
  constructor (id, location, velocity, name, socket, type, inventory = new Inventory(54)) {
    super(id, location, velocity)

    this.name = name
    this.socket = socket
    this.type = type
    this.inventory = inventory
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
  }

  setSocket (socket) {
    this.socket = socket
  }

  setType (type) {
    this.type = type
  }

  sendMessage (sender, message, format = '<%s> %s\n') {
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

  toObject () {
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
      type: this.type
    }
  }
}

module.exports = Player
