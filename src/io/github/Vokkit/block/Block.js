class Block {
  constructor (position, id) {
    if (Array.isArray(position)) {
      this.position = new THREE.Vector3(position[0], position[1], position[2])
    } else {
      this.position = position.clone()
    }
    this.id = id
  }

  setId (id) {
    this.id = id
  }

  getId () {
    return this.id
  }

  getPosition () {
    return this.position.clone()
  }
}

module.exports = Block
