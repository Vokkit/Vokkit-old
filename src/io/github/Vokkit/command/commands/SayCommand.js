const Command = require('./Command.js')
const ParameterType = require('../parameter/ParameterType.js')
const Player = require('../../entity/Player.js')

class SayCommand extends Command {
  constructor () {
    super('say', '메세지를 전달합니다.', '/say [player] [message]', [
      [ParameterType.PLAYER, ParameterType.UNLIMITED_STRING],
      [ParameterType.UNLIMITED_STRING]
    ])
  }

  execute (parameterNumber, sender, parameter) {
    switch (parameterNumber) {
      case 0:
        const target = parameter[0].getValue()

        target.sendMessage(sender.getName() + ' -> ' + target.getName(), parameter[1].getValue(), '%s: %s\n')
        sender.sendMessage(sender.getName() + ' -> ' + target.getName(), parameter[1].getValue(), '%s: %s\n')
        break
      case 1:
        sender.broadcast(sender.getName(), parameter[0].getValue())
        break
      default:
        sender.sendMessage(Vokkit.getServer().getName(), this.getUsage())
        break
    }
  }
}

module.exports = SayCommand
