const ItemStack = require('../item/ItemStack')

class Inventory {
  constructor (size, contents = []) {
    this.size = size
    this.contents = contents
  }

  getContents () {
    return this.contents
  }

  getItem (count) {
    return this.contents[count]
  }

  setItem (count, item) {
    this.contents[count] = item
  }

  addItem (items) {
    if (items instanceof Array) {
      for (const i in items) {
        if (!this.addItem(items[i])) return false
      }
      return true
    }

    for (const i in this.contents) {
      if (typeof this.contents[i] === 'undefined') {
        this.contents[i] = items
        return true
      }
    }

    return false
  }

  removeItem (items) {
    if (items instanceof Array) {
      for (const i in items) {
        this.removeItem(items[i])
      }
      return
    }

    for (const i in this.contents) {
      if (this.contents[i].equals(items)) {
        if (this.contents[i].getAmount() < items.getAmount()) {
          items.setAmount(items.getAmount() - this.contents[i].getAmount())
          this.contents[i] = undefined
        } else if (this.contents[i].getAmount() == items.getAmount()) {
          this.contents[i] = undefined
          return
        } else if (this.contents[i].getAmount() > items.getAmount()) {
          this.contents[i].setAmount(this.contents[i].getAmount() - items.getAmount())
          return
        }
      }
    }
  }

  toObject () {
    const contents = []
    for (let i = 0; i < this.size; i++) {
      if (typeof this.contents[i] === 'undefined') contents[i] = undefined
      else contents[i] = this.contents[i].toObject()
    }
    return {
      size: this.size,
      contents: contents
    }
  }

  static fromObject (object) {
    const contents = []
    for (let i = 0; i < object.size; i++) {
      if (object.contents[i] == undefined) contents[i] = undefined
      else contents[i] = ItemStack.fromObject(object.contents[i])
    }
    return new Inventory(object.size, contents)
  }
}

module.exports = Inventory
