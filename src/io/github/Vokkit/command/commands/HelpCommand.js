const Command = require('./Command.js')
const ParameterType = require('../parameter/ParameterType.js')
const Lang = require('../../lang/Lang')

class HelpCommand extends Command {
  constructor () {
    super('help', Lang.format('command.help.description'), Lang.format('command.help.usage'), [
      [],
      [ParameterType.STRING]
    ])
  }

  execute (parameterNumber, sender, parameter) {
    let allCommands = Vokkit.getServer().getCommandManager().getCommandProvider().getAllCommands()
    let text = ''

    switch (parameterNumber) {
      case 0:
        sender.sendMessage(Lang.format('command.help.header', [1, 1]))

        for (let v of allCommands) {
          text += v.getName() + ' - ' + v.getDescription() + '\n'
        }

        sender.sendMessage(text)
        sender.sendMessage(Lang.format('command.help.footer'))
        break
      case 1:
        for (let v of allCommands) {
          if (v.getName() === parameter[0].getValue()) {
            text = v.getName() + ' - ' + v.getDescription()

            break
          }
        }

        sender.sendMessage(text)
        break
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = HelpCommand
