const Block = require('../block/Block.js')

const SocketManager = require('./SocketManager.js')

class WorldManager extends SocketManager {
  addListener(socket) {
    socket.on('requestSetBlock', function (data) {
      let world = Vokkit.getServer().getWorld(data.worldName)
      world.setBlock(new Block(new THREE.Vector3(data.x, data.y, data.z), data.id))
      Vokkit.getServer().getSocketServer().emit('setBlock', data)
    })
  }

  getWorldArray() {
    let worldList = Vokkit.getServer().getWorlds()
    let worldData = []
    for (let i in worldList) {
      worldData.push(worldList[i].toArray())
    }
    return worldData
  }
}

module.exports = WorldManager