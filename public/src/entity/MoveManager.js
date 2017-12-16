class MoveManager {
  constructor () {
    this.socket = Vokkit.getClient().getSocket()
    this.socket.on('move', function (data) {
      if (Vokkit.getClient().getLocalPlayer() != null && data.id === Vokkit.getClient().getLocalPlayer().getId() && !data.update) return

      const players = Vokkit.getClient().getOnlinePlayers()
      for (const i in players) {
        if (players[i].getId() === data.id) {
          const loc = players[i].getLocation()
          loc.set(data.x, data.y, data.z)
          loc.setYaw(data.yaw)
          loc.setPitch(data.pitch)
          players[i].teleport(loc)
          players[i].setVelocity(new THREE.Vector3(data.velocity[0], data.velocity[1], data.velocity[2]))
        }
      }
    })
  }

  requestMove (location, velocity) {
    this.socket.emit('requestMove', {
      x: location.x,
      y: location.y,
      z: location.z,
      yaw: location.yaw,
      pitch: location.pitch,
      velocity: [velocity.x, velocity.y, velocity.z]
    })
  }

  moveLocalPlayer (press) {
    const localPlayer = Vokkit.getClient().getLocalPlayer()
    const location = localPlayer.getLocation()
    const yaw = location.getYaw()
    const fps = Vokkit.getClient().getScreenManager().getScreen('MainScreen').getFPS()
    const multiply = 10 / fps
    const velocity = localPlayer.getVelocity()
    const tmpVector = new THREE.Vector3()
    if (press[0]) {
      velocity.add(tmpVector.set(-Math.sin(yaw), 0, Math.cos(yaw)).multiplyScalar(multiply))
    } else if (press[1]) {
      velocity.add(tmpVector.set(Math.sin(yaw), 0, -Math.cos(yaw)).multiplyScalar(multiply))
    }
    if (press[2]) {
      velocity.add(tmpVector.set(-Math.sin(yaw - Math.PI / 2), 0, Math.cos(yaw - Math.PI / 2)).multiplyScalar(multiply))
    } else if (press[3]) {
      velocity.add(tmpVector.set(-Math.sin(yaw + Math.PI / 2), 0, Math.cos(yaw + Math.PI / 2)).multiplyScalar(multiply))
    }
    if (press[4]) {
      velocity.add(tmpVector.set(0, 1.5, 0).multiplyScalar(multiply))
    } else if (press[5]) {
      velocity.add(tmpVector.set(0, -1, 0).multiplyScalar(multiply))
    }

    // localPlayer.addVelocity(new THREE.Vector3(0, -9.8 / fps, 0));
    localPlayer.setVelocity(velocity)
    const players = Vokkit.getClient().getOnlinePlayers()
    for (const i in players) {
      players[i].renderer.checkMove(location, velocity)
    }
    this.requestMove(localPlayer.getLocation(), localPlayer.getVelocity())

    console.log(localPlayer.getLocation())
  }
}

module.exports = MoveManager
