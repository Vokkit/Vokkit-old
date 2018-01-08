const Command = require('./Command.js')
const Lang = require('../../lang/Lang')

class ExitCommand extends Command {
  constructor () {
    super('exit', Lang.format('command.quit.description'), '/exit', [
      []
    ])
  }

  execute (parameterNumber, sender, parameter) {
    switch (parameterNumber) {
      case 0:
        sender.sendMessage(Lang.format('command.quit.message'))
        Vokkit.getServer().getLogger().info(Lang.format('command.quit.saving.world'))
        const worlds = Vokkit.getServer().getWorlds()
        for (const i in worlds) {
          worlds[i].saveWorld()
        }
        Vokkit.getServer().getLogger().info(Lang.format('command.quit.save.world'))
        process.exit()
        // You don't have to use 'break', because is is unreachable code.
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = ExitCommand
