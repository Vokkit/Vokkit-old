const PlayerMoveEvent = require('../event/player/PlayerMoveEvent.js')

const SocketManager = require('./SocketManager.js')

class MoveManager extends SocketManager {
  addListener(socket) {
    socket.on('requestMove', function (data) {
      let player = Vokkit.getServer().getPlayerById(socket.id)
      let location = player.getLocation()
      location.set(data.x, data.y, data.z)
      location.setYaw(data.yaw)
      location.setPitch(data.pitch)
      let lastVelocity = player.getVelocity()
      let velocity = new THREE.Vector3(data.velocity[0], data.velocity[1], data.velocity[2])
      player.setVelocity(velocity)
      let playerMoveEvent = new PlayerMoveEvent(player, player.getLocation(), location)
      Vokkit.getServer().getPluginManager().makeEvent(playerMoveEvent)
      if (playerMoveEvent.isCancelled()) {
        location = player.getLocation()
        socket.emit('move', {
          id: player.getId(),
          x: location.getX(),
          y: location.getY(),
          z: location.getZ(),
          yaw: location.getYaw(),
          pitch: location.getPitch(),
          velocity: [lastVelocity.x, lastVelocity.y, lastVelocity.z]
        })
        return
      }
      player.teleport(location, false)
    })
  }
}

module.exports = MoveManager
