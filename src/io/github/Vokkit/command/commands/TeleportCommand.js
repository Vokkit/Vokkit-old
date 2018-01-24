const Command = require('./Command.js')
const ParameterType = require('../parameter/ParameterType.js')
const Player = require('../../entity/Player.js')
const Lang = require('../../lang/Lang')

class TeleportCommand extends Command {
  constructor () {
    super('tp', Lang.format('command.tp.description'), Lang.format('command.tp.usage'), [
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

          text = Lang.format('command.tp.success', [sender.getName(), target.getName()])

          sender.sendMessage(text)
        }
        break
      case 1:
        mover = parameter[0].getValue()
        target = parameter[1].getValue()
        mover.teleport(target.getLocation())

        text = Lang.format('command.tp.success', [mover.getName(), target.getName()])

        sender.sendMessage(text)
        break
      case 2:
        mover = parameter[0].getValue()
        location = mover.getLocation()
        location.set(parameter[1].getValue(), parameter[2].getValue(), parameter[3].getValue())

        mover.teleport(location)

        text = Lang.format('command.tp.success.coordinates', [mover.getName(), location.getX(), location.getY(), location.getZ()])

        sender.sendMessage(text)
        break
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = TeleportCommand
