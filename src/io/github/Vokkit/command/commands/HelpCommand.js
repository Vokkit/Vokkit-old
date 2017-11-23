const Command = require('./Command.js')
const ParameterType = require('../parameter/ParameterType.js')

class HelpCommand extends Command {
  constructor () {
    super('help', '도움말을 출력합니다.', '/help (command name)', [
      [],
      [ParameterType.STRING]
    ])
  }

  execute (parameterNumber, sender, parameter) {
    let allCommands = Vokkit.getServer().getCommandManager().getCommandProvider().getAllCommands()
    let text = ''

    switch (parameterNumber) {
      case 0:
        for (let v of allCommands) {
          text += v.getName() + ' - ' + v.getDescription() + '\n'
        }

        sender.sendMessage(Vokkit.getServer().getName(), text)
        break
      case 1:
        for (let v of allCommands) {
          if (v.getName() === parameter[0].getValue()) {
            text = v.getName() + ' - ' + v.getDescription()

            break
          }
        }

        sender.sendMessage(Vokkit.getServer().getName(), text)
        break
      default:
        sender.sendMessage(Vokkit.getServer().getName(), this.getUsage())
        break
    }
  }
}

module.exports = HelpCommand
