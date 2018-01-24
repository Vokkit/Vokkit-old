const Command = require('./Command.js')
const ParameterType = require('../parameter/ParameterType.js')
const Lang = require('../../lang/Lang')

class SayCommand extends Command {
  constructor () {
    super('say', Lang.format('command.say.description'), Lang.format('command.say.usage'), [
      [ParameterType.UNLIMITED_STRING]
    ])
  }

  execute (parameterNumber, sender, parameter) {
    switch (parameterNumber) {
      case 0:
        sender.broadcast(Lang.format('command.say.format', [sender.getName(), parameter[0].getValue()]))
        break
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = SayCommand
