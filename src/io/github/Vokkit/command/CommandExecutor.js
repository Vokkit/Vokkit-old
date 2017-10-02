const Util = require('../Util.js')

class CommandExecutor {
  constructor(provider) {
    this.commandProvider = provider
  }

  execute(sender, command, parameter, provider = 'vokkit') {
    let commands = this.commandProvider.getAllCommands()

    for (let v of commands) {
      if (v.getName() === command && v.getProvider() === provider) {
        let parameterType = parameter.map(object => {
          return object.getType()
        })

        let types = v.getParameterTypes()
        for (let i in types) {
          if (Util.equals(types[i], parameterType)) {
            v.execute(Number(i), sender, parameter)

            return
          }
        }

        sender.sendMessage(v.getUsage())

        return
      }
    }

    sender.sendMessage('커맨드를 찾을 수 없습니다.')
  }
}

module.exports = CommandExecutor
