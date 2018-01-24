const Command = require('./Command.js')
const Lang = require('../../lang/Lang')

class StopCommand extends Command {
  constructor () {
    super('stop', Lang.format('command.stop.description'), Lang.format('command.stop.usage'), [
      []
    ])
  }

  execute (parameterNumber, sender, parameter) {
    switch (parameterNumber) {
      case 0:
        sender.sendMessage(Lang.format('command.stop.message'))
        Vokkit.getServer().getLogger().info(Lang.format('command.stop.saving.world'))
        const worlds = Vokkit.getServer().getWorlds()
        for (const i in worlds) {
          worlds[i].saveWorld()
        }
        Vokkit.getServer().getLogger().info(Lang.format('command.stop.save.world'))
        process.exit()
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = StopCommand
