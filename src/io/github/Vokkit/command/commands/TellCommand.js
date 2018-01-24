const Command = require('./Command.js')
const ParameterType = require('../parameter/ParameterType.js')
const Lang = require('../../lang/Lang')

class TellCommand extends Command {
  constructor () {
    super('tell', Lang.format('command.tell.description'), Lang.format('command.tell.usage'), [
      [ParameterType.PLAYER, ParameterType.UNLIMITED_STRING]
    ])
  }

  execute (parameterNumber, sender, parameter) {
    switch (parameterNumber) {
      case 0:
        const target = parameter[0].getValue()

        target.sendMessage(Lang.format('command.tell.format', [sender.getName(), target.getName(), parameter[1].getValue()]))
        sender.sendMessage(Lang.format('command.tell.format', [sender.getName(), target.getName(), parameter[1].getValue()]))
        break
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = TellCommand
