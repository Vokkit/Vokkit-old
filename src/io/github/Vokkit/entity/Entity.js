class Entity {
  constructor (id, location, velocity) {
    this.id = id
    this.location = typeof location === 'undefined' ? undefined : location.clone()
    this.velocity = typeof location === 'undefined' ? undefined : velocity.clone()
  }

  getId () {
    return this.id
  }

  getLocation () {
    return this.location.clone()
  }

  teleport (loc, update = true) {
    this.location.copy(loc)

    Vokkit.getServer().getSocketServer().emit('move', {
      id: this.id,
      x: loc.getX(),
      y: loc.getY(),
      z: loc.getZ(),
      yaw: loc.getYaw(),
      pitch: loc.getPitch(),
      velocity: this.velocity,
      update: update
    })
  }

  getVelocity () {
    return this.velocity.clone()
  }

  setVelocity (velocity) {
    this.velocity.copy(velocity)
  }

  equals (object) {
    return object instanceof this.constructor && object.getId() === this.getId()
  }
}

module.exports = Entity
