const Command = require('./Command.js')
const ParameterType = require('../parameter/ParameterType.js')
const Lang = require('../../lang/Lang')

class KickCommand extends Command {
  constructor () {
    super('kick', Lang.format('command.kick.description'), Lang.format('command.kick.usage'), [
      [ParameterType.PLAYER]
    ])
  }

  execute (parameterNumber, sender, parameter) {
    switch (parameterNumber) {
      case 0:
        const player = parameter[0].getValue()
        player.getSocket().emit('disconnect', {
          reason: '나중에쓸래'
        })
        sender.sendMessage(Lang.format('command.kick.success', player.getName()))
        break
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = KickCommand
