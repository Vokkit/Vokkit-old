const Block = require('../block/Block')
const Material = require('../Materials')

class WorldManager {
  constructor () {
    this.socket = Vokkit.getClient().getSocket()
    this.socket.on('setBlock', data => Vokkit.getClient().getWorld(data.worldName).setBlock(new Block(new THREE.Vector3(data.x, data.y, data.z), Material.get(data.id))))
  }
}

module.exports = WorldManager
