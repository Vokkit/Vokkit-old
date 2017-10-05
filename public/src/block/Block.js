class Block {
  constructor (position, id) {
    this.position = position
    this.id = id
  }

  getPosition () {
    return this.position.clone()
  }

  setPosition (position) {
    this.position = position
  }

  getId () {
    return this.id
  }

  setId (id) {
    this.id = id
  }
}

module.exports = Block
