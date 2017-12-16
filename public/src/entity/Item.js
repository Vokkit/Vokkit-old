const Entity = require('./Entity')
const ItemRenderer = require('../renderer/ItemRenderer')

class Item extends Entity {
  constructor (id, location, velocity, health, itemStack) {
    super(id, location, velocity, health)
    this.itemStack = itemStack
    this.renderer = new ItemRenderer(`blocks/${itemStack.getType().getName().toLowerCase()}.png`, this) // 블럭이 아닌 아이템이 나온 경우 분기 처리해야 함.
  }

  getItemStack () {
    return this.itemStack
  }

  setItemStack (itemStack) {
    this.itemStack = itemStack
  }
}

module.exports = Item
