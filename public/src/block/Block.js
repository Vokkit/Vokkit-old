const Material = require('../Materials')

class Block {
  constructor (position, type) {
    this.position = position
    this.type = type
    this.id = type.id
  }

  getPosition () {
    return this.position.clone()
  }

  setPosition (position) {
    this.position = position
  }

  getId () {
    return this.type.id
  }

  setId (id) {
    this.type = Material.get(id)
  }

  getType () {
    return this.type
  }

  setType (type) {
    this.type = type
  }
}

module.exports = Block
