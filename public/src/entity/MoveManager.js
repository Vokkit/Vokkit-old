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
    const velocity = localPlayer.getVelocity()
    const tmpVector = new THREE.Vector3()
    if (localPlayer.isFlying()) {
      const multiply = 4 / 30
      if (localPlayer.onGround) {
        localPlayer.setFlying(false)
      } else {
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
          velocity.add(tmpVector.set(0, 2, 0).multiplyScalar(multiply))
        } else if (press[5]) {
          velocity.add(tmpVector.set(0, -2, 0).multiplyScalar(multiply))
        }
      }
    } else {
      const multiply = 1 / 30
      const add = new THREE.Vector3()
      if (press[0]) {
        if (localPlayer.onGround) {
          add.add(tmpVector.set(-Math.sin(yaw), 0, Math.cos(yaw)).multiplyScalar(multiply))
        } else {
          add.add(tmpVector.set(-Math.sin(yaw), 0, Math.cos(yaw)).multiplyScalar(multiply * 0.05))
        }
      } else if (press[1]) {
        if (localPlayer.onGround) {
          add.add(tmpVector.set(Math.sin(yaw), 0, -Math.cos(yaw)).multiplyScalar(multiply))
        } else {
          add.add(tmpVector.set(Math.sin(yaw), 0, -Math.cos(yaw)).multiplyScalar(multiply * 0.05))
        }
      }
      if (press[2]) {
        if (localPlayer.onGround) {
          add.add(tmpVector.set(-Math.sin(yaw - Math.PI / 2), 0, Math.cos(yaw - Math.PI / 2)).multiplyScalar(multiply))
        } else {
          add.add(tmpVector.set(-Math.sin(yaw - Math.PI / 2), 0, Math.cos(yaw - Math.PI / 2)).multiplyScalar(multiply * 0.05))
        }
      } else if (press[3]) {
        if (localPlayer.onGround) {
          add.add(tmpVector.set(-Math.sin(yaw + Math.PI / 2), 0, Math.cos(yaw + Math.PI / 2)).multiplyScalar(multiply))
        } else {
          add.add(tmpVector.set(-Math.sin(yaw + Math.PI / 2), 0, Math.cos(yaw + Math.PI / 2)).multiplyScalar(multiply * 0.05))
        }
      }
      if (press[4]) {
        if (localPlayer.onGround) {
          add.add(tmpVector.set(0, 4.5, 0).multiplyScalar(multiply))
        }
      }
      if (press[5]) {
        add.multiplyScalar(0.3)
      }
      velocity.add(add)
      velocity.add(new THREE.Vector3(0, -0.25 / 30))
    }
    localPlayer.setVelocity(velocity)
    const players = Vokkit.getClient().getOnlinePlayers()
    for (const i in players) {
      const result = players[i].renderer.checkMove(players[i].getLocation(), players[i].getVelocity())
      if (result.yCollision === 1) players[i].onGround = true
      else players[i].onGround = false
    }
    this.requestMove(localPlayer.getLocation(), localPlayer.getVelocity())
  }
}

module.exports = MoveManager
