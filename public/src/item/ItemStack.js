const ItemMeta = require('./ItemMeta')

class ItemStack {
  constructor (type, amount = 1, data = 0) {
    this.type = type
    this.amount = amount
    this.data = data
    this.itemMeta = new ItemMeta()
  }

  getType () {
    return this.type
  }

  setType (type) {
    this.type = type
  }

  getAmount () {
    return this.amount
  }

  setAmount (amount) {
    this.amount = amount
  }

  getData () {
    return this.data
  }

  setData (data) {
    this.data = data
  }

  getItemMeta () {
    return this.itemMeta
  }

  setItemMeta (itemMeta) {
    this.itemMeta = itemMeta
  }

  equals (item) {
    return item instanceof ItemStack && item.getType().equals(this.type) && item.getData() == this.data && item.getItemMeta().equals(this.getItem
    ())
  }
}

module.exports = ItemStack
