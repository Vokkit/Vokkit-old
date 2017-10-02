let sender
let command
let parameter

let HelpCommand = require('./commands/HelpCommand.js')
let TeleportCommand = require('./commands/TeleportCommand.js')

let helpCommand = new HelpCommand()
let teleportCommand = new TeleportCommand()

function execute(sender, command, parameter, func) {
  let origin = command.getParameterType()
  let parameterType = []

  for(let v of parameter) {
    parameterType.push(v.getType())
    Vokkit.getServer().getLogger().info(v.getType())
  }

  for(let i in origin) {
    if(Util.equals(origin[i], parameterType)) {
      func(i)

      return
    }
  }

  Vokkit.getServer().getLogger().info(command.getUsage())
}

class CommandExecutor {
  static execute(sender, command, parameter) {
    switch(command) {
      case helpCommand.getName():
        execute(sender, helpCommand, parameter, (i) => {
          helpCommand.execute(Number(i), parameter, sender.getPlayer(), [
            helpCommand,
            teleportCommand
          ])
        })
        break
      case teleportCommand.getName():
        execute(sender, teleportCommand, parameter, (i) => {
          teleportCommand.execute(Number(i), parameter, sender.getPlayer())
        })
        break
      default:
        Vokkit.getServer().getLogger().warn('커맨드를 찾을 수 없습니다.')
        break
    }
  }
}

module.exports = CommandExecutor
