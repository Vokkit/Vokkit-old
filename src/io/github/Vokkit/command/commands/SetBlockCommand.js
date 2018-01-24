const Command = require('./Command.js')
const Lang = require('../../lang/Lang')
const Block = require('../../block/Block.js')
const ParameterType = require('../parameter/ParameterType.js')

class SetBlockCommand extends Command {
  constructor () {
    super('setblock', Lang.format('command.setblock.description'), Lang.format('command.setblock.usage'), [
      [ParameterType.NUMBER, ParameterType.NUMBER, ParameterType.NUMBER, ParameterType.NUMBER]
    ])
  }

  execute (parameterNumber, sender, parameter) {
    switch (parameterNumber) {
      case 0:
        const world = Vokkit.getServer().getWorlds()[0]
        const block = new Block([parameter[1].getValue(), parameter[2].getValue(), parameter[3].getValue()], parameter[0].getValue())

        world.setBlock(block)
        sender.sendMessage(Lang.format('command.setblock.success'))
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = SetBlockCommand
