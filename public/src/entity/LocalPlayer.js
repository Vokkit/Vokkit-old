const Player = require('./Player')

const Inventory = require('../inventory/Inventory')

class LocalPlayer extends Player {
  constructor(id, location, velocity, name, type, inventory = new Inventory(54), gamemode = 0) {
    super(id, location, velocity, name, type, inventory, gamemode)
  }

  teleport(location) {
    super.teleport(location)
    Vokkit.getClient().getSceneManager().updateGroup(location)
  }
}

module.exports = LocalPlayer