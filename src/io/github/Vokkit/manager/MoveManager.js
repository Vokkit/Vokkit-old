var PlayerMoveEvent = require('../event/player/PlayerMoveEvent.js')

var SocketManager = require('./SocketManager.js')

class MoveManager extends SocketManager {
  addListener(socket) {
    socket.on('requestMove', function (data) {
      var player = Vokkit.getServer().getPlayerById(socket.id)
      var location = player.getLocation()
      location.set(data.x, data.y, data.z)
      location.setYaw(data.yaw)
      location.setPitch(data.pitch)
      var lastVelocity = player.getVelocity()
      var velocity = new THREE.Vector3(data.velocity[0], data.velocity[1], data.velocity[2])
      player.setVelocity(velocity)
      var playerMoveEvent = new PlayerMoveEvent(player, player.getLocation(), location)
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
      player.teleport(location)
    })
  }
}

module.exports = MoveManager
