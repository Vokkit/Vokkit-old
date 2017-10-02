let Command = require('./Command.js')
let ParameterType = require('../parameter/ParameterType.js')

class TeleportCommand extends Command {
  constructor() {
    super('tp', '플레이어를 특정한 위치로 이동시킵니다.', '/tp [player]\n/tp [player] [player]\n/tp [player] [x] [y] [z]', [
      [ParameterType.PLAYER],
      [ParameterType.PLAYER, ParameterType.PLAYER],
      [ParameterType.PLAYER, ParameterType.INTEGER, ParameterType.INTEGER, ParameterType.INTEGER]
    ])
  }

  execute(parameterNumber, parameter, player) {
    let target
    let mover
    switch(parameterNumber) {
      case 0:
        target = parameter[0].getValue()
        player.teleport(target.getLocation())
        Vokkit.getServer().getSocketServer().emit("move", {
            id: player.getId(),
            x: location.getX(),
            y: location.getY(),
            z: location.getZ(),
            yaw: location.getYaw(),
            pitch: location.getPitch(),
            velocity: [player.getVelocity().x, player.getVelocity().y, player.getVelocity().z]
        });
        break
      case 1:
        mover = parameter[0].getValue()
        target = parameter[1].getValue()
        mover.teleport(target.getLocation())
        Vokkit.getServer().getSocketServer().emit("move", {
            id: mover.getId(),
            x: location.getX(),
            y: location.getY(),
            z: location.getZ(),
            yaw: location.getYaw(),
            pitch: location.getPitch(),
            velocity: [mover.getVelocity().x, mover.getVelocity().y, mover.getVelocity().z]
        });
        break
      case 2:
        mover = parameter[0].getValue()
        let location = mover.getLocation()
        location.set(parameter[1].getValue(), parameter[2].getValue(), parameter[3].getValue())

        mover.teleport(location)
        Vokkit.getServer().getSocketServer().emit("move", {
            id: mover.getId(),
            x: location.getX(),
            y: location.getY(),
            z: location.getZ(),
            yaw: location.getYaw(),
            pitch: location.getPitch(),
            velocity: [mover.getVelocity().x, mover.getVelocity().y, mover.getVelocity().z]
        });
        break
      default:
        Vokkit.getServer().getLogger().info(this.usage)
        break
    }
  }
}

module.exports = TeleportCommand
