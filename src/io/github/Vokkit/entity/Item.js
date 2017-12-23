const Entity = require('./Entity')

class Item extends Entity {
  constructor (id, location, velocity, health, itemStack) {
    super(id, location, velocity, health)
    this.itemStack = itemStack
  }

  getItemStack () {
    return this.itemStack
  }

  setItemStack (itemStack) {
    this.itemStack = itemStack
  }
}

module.exports = Item
