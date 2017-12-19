const Command = require('./Command.js')
const ParameterType = require('../parameter/ParameterType.js')

class SayCommand extends Command {
  constructor () {
    super('say', '메세지를 전달합니다.', '/say [message]', [
      [ParameterType.UNLIMITED_STRING]
    ])
  }

  execute (parameterNumber, sender, parameter) {
    switch (parameterNumber) {
      case 0:
        sender.broadcast(`[${sender.getName()}] ` + parameter[0].getValue())
        break
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = SayCommand
