const ItemMeta = require('./ItemMeta')
const BlockList require('../block/BlockList.js')

class ItemStack {
  constructor (id, amount = 1, data = 0) {
    this.id = id
    this.amount = amount
    this.data = data
    this.itemMeta = new ItemMeta()
  }

  getId () {
    return this.id
  }

  setId (id) {
    this.id = id
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
      id: this.id,
      amount: this.amount,
      data: this.data,
      itemMeta: this.itemMeta.toObject()
    }
  }

  static fromObject (object) {
    return object == null ? new ItemStack(BlockList.AIR) : new ItemStack(object.id, object.amount, object.data, ItemMeta.fromObject(object.itemMeta))
  }
}

module.exports = ItemStack
