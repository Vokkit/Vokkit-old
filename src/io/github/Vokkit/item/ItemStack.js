const ItemMeta = require('./ItemMeta')

const Material = require('../Material')

class ItemStack {
  constructor (type, amount = 1, data = 0, itemMeta = new ItemMeta()) {
    this.type = type
    this.amount = amount
    this.data = data
    this.itemMeta = itemMeta
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
    return item instanceof ItemStack && item.getType().equals(this.type) && item.getData() === this.data && item.getItemMeta().equals(this.getItem())
  }

  toObject () {
    return {
      type: this.type.id,
      amount: this.amount,
      data: this.data,
      itemMeta: this.itemMeta.toObject()
    }
  }

  static fromObject (object) {
    return new ItemStack(Material.get(object.type), object.amount, object.data, ItemMeta.fromObject(object.itemMeta))
  }
}

module.exports = ItemStack
