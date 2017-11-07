class ItemMeta {
  constructor (lore = [], displayName = null) {
    this.lore = lore
    this.displayName = displayName
  }

  getLore () {
    return this.lore
  }

  setLore (lore) {
    this.lore = lore
  }

  getDisplayName () {
    return this.displayName
  }

  setDisplayName (displayName) {
    this.displayName = displayName
  }

  equals (itemMeta) {
    return itemMeta instanceof ItemMeta && itemMeta.getLore().slice().splice(this.getLore()).length == 0 && this.getLore().slice().splice(itemMeta.getLore()).length == 0 && this.getDisplayName() == itemMeta.getDisplayName()
  }

  toObject () {
    return {
      lore: this.lore,
      displayName: this.displayName
    }
  }
}

module.exports = ItemMeta
