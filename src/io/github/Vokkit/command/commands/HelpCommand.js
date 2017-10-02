let Command = require('./Command.js')
let ParameterType = require('../parameter/ParameterType.js')

class HelpCommand extends Command {
  constructor() {
    super('help', '도움말을 출력합니다.', '/help (command name)', [
      [],
      [ParameterType.STRING]
    ])
  }

  execute(parameterNumber, parameter, player, allCommands) {
    switch(parameterNumber) {
      case 0:
        for(let v of allCommands) {
          Vokkit.getServer().getLogger().info(v.getName() + ': ' + v.getDescription())
        }
        break
      case 1:
        for(let v of allCommands) {
          if(v.getName() === parameter[0].getValue()) {
            Vokkit.getServer().getLogger().info(v.getName() + ': ' + v.getDescription())

            return
          }
        }

        Vokkit.getServer().getLogger().warn('커맨드를 찾을 수 없습니다.')
        break
      default:
        Vokkit.getServer().getLogger().info(this.usage)
        break
    }
  }
}

module.exports = HelpCommand
