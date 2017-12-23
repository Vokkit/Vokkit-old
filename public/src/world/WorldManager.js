const Block = require('../block/Block')

class WorldManager {
  constructor () {
    this.socket = Vokkit.getClient().getSocket()
    this.socket.on('setBlock', data => Vokkit.getClient().getWorld(data.worldName).setBlock(new Block(new THREE.Vector3(data.x, data.y, data.z), data.id)))
  }
}

module.exports = WorldManager
