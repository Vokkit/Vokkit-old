const Command = require('./Command.js')
const ParameterType = require('../parameter/ParameterType.js')
const Player = require('../../entity/Player.js')

class TeleportCommand extends Command {
  constructor () {
    super('tp', '플레이어를 특정한 위치로 이동시킵니다.', '/tp [player]\n/tp [player] [player]\n/tp [player] [x] [y] [z]', [
      [ParameterType.PLAYER],
      [ParameterType.PLAYER, ParameterType.PLAYER],
      [ParameterType.PLAYER, ParameterType.NUMBER, ParameterType.NUMBER, ParameterType.NUMBER]
    ])
  }

  execute (parameterNumber, sender, parameter) {
    let target
    let mover
    let text
    let location
    switch (parameterNumber) {
      case 0:
        if (sender instanceof Player) {
          target = parameter[0].getValue()
          sender.teleport(target.getLocation())

          text = sender.getName() + '이(가) ' + target.getName() + '에게로 이동하였습니다.'

          sender.sendMessage(text)
        }
        break
      case 1:
        mover = parameter[0].getValue()
        target = parameter[1].getValue()
        mover.teleport(target.getLocation())

        text = mover.getName() + '이(가) ' + target.getName() + '에게로 이동하였습니다.'

        sender.sendMessage(text)
        break
      case 2:
        mover = parameter[0].getValue()
        location = mover.getLocation()
        location.set(parameter[1].getValue(), parameter[2].getValue(), parameter[3].getValue())

        mover.teleport(location)

        text = mover.getName() + '이(가) x: ' + location.getX() + ' y: ' + location.getY() + ' z: ' + location.getZ() + ' 좌표로 이동하였습니다.'
        
        sender.sendMessage(text)
        break
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = TeleportCommand
