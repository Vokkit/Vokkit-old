class Location {
  constructor(world = Vokkit.getServer().getWorlds()[0], x = 0, y = 0, z = 0, yaw = 0, pitch = 0) {
    this.world = world
    this.x = x
    this.y = y
    this.z = z
    this.yaw = yaw
    this.pitch = pitch
  }

  getWorld() {
    return this.world
  }

  setWorld(world) {
    this.world = world
    return this
  }

  getX() {
    return this.x
  }

  setX(x) {
    this.x = x
    return this
  }

  getY() {
    return this.y
  }

  setY(y) {
    this.y = y
    return this
  }

  getZ() {
    return this.z
  }

  setZ(z) {
    this.z = z
    return this
  }

  getYaw() {
    return this.yaw
  }

  setYaw(yaw) {
    this.yaw = yaw
    return this
  }

  getPitch() {
    return this.pitch
  }

  setPitch(pitch) {
    this.pitch = pitch
    return this
  }

  distance(loc) {
    return Math.sqrt(this.distanceSquared(loc))
  }

  distanceSquared(loc) {
    return Math.pow(loc.x - this.x, 2) + Math.pow(loc.y - this.y, 2) + Math.pow(loc.z - this.z, 2)
  }

  set(x, y, z) {
    if (x instanceof Location) {
      this.x = x.x
      this.y = x.y
      this.z = x.z
    } else if (Array.isArray(x)) {
      this.x = x[0]
      this.y = x[1]
      this.z = x[2]
    } else {
      this.x = x
      this.y = y
      this.z = z
    }
    return this
  }

  add(x, y, z) {
    if (x instanceof Location) {
      this.x += x.x
      this.y += x.y
      this.z += x.z
    } else if (Array.isArray(x)) {
      this.x += x[0]
      this.y += x[1]
      this.z += x[2]
    } else {
      this.x += x
      this.y += y
      this.z += z
    }
    return this
  }

  subtract(x, y, z) {
    if (x instanceof Location) {
      this.x -= x.x
      this.y -= x.y
      this.z -= x.z
    } else if (Array.isArray(x)) {
      this.x -= x[0]
      this.y -= x[1]
      this.z -= x[2]
    } else {
      this.x -= x
      this.y -= y
      this.z -= z
    }
    return this
  }

  toVector() {
    return new THREE.Vector3(this.x, this.y, this.z)
  }

  clone() {
    return new Location(this.world, this.x, this.y, this.z, this.yaw, this.pitch)
  }

  copy(loc) {
    this.world = loc.world
    this.x = loc.x
    this.y = loc.y
    this.z = loc.z
    this.yaw = loc.yaw
    this.pitch = loc.pitch
    return this
  }

  equals(loc) {
    return loc.world.equals(this.world) && loc.x == this.x && loc.y == this.y && loc.z == this.z && loc.yaw == this.yaw && loc.pitch == this.pitch
  }

  static locToBlock(loc) {
    loc.set(Math.floor(loc.x), Math.floor(loc.y), Math.floor(loc.z))
    return loc
  }
}



module.exports = Location