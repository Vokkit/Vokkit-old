class Entity {
  constructor (id, location, velocity, health = 0) {
    this.id = id
    this.location = typeof location === 'undefined' ? undefined : location.clone()
    this.velocity = typeof location === 'undefined' ? undefined : velocity.clone()
    this.health = health
    this.renderer = null
    if (!global.bodies) global.bodies = []
  }

  equals (object) {
    return object instanceof this.constructor && object.getId() === this.getId()
  }

  getId () {
    return this.id
  }

  getLocation () {
    return this.location.clone()
  }

  getVelocity () {
    return this.velocity.clone()
  }

  getHealth () {
    return this.health
  }

  teleport (location) {
    this.location.copy(location)
    if (this.renderer) this.renderer.updatePosition(this.location, this.velocity)
  }

  setId (id) {
    this.id = id
  }

  setVelocity (velocity) {
    this.velocity.copy(velocity)
  }

  setHealth (health) {
    this.health = health
  }
}

module.exports = Entity
