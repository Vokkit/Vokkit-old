var Entity = require('./Entity.js')

class Player extends Entity {
  constructor(id, location, velocity, name, socket, type) {
    super(id, location, velocity)

    this.name = name
    this.socket = socket
    this.type = type
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

  setType(type) {
    this.type = type
  }

  setVRMode(vrmode) {
    this.VRMode = !!vrmode
  }

  isVRMode() {
    return this.VRMode
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

  teleport(location) {
    super.teleport(location)
    Vokkit.getServer().getSocketServer().emit('move', {
      id: this.getId(),
      x: location.getX(),
      y: location.getY(),
      z: location.getZ(),
      yaw: location.getYaw(),
      pitch: location.getPitch(),
      velocity: [this.getVelocity().x, this.getVelocity().y, this.getVelocity().z]
    })
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
      type: this.type
    }
  }
}

module.exports = Player
