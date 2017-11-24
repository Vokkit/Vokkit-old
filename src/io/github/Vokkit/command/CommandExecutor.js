const Util = require('../Util.js')
const ParameterType = require('./parameter/ParameterType.js')
const Parameter = require('./parameter/Parameter.js')

class CommandExecutor {
  constructor (provider) {
    this.commandProvider = provider
  }

  execute (sender, command, parameter, provider = 'vokkit') {
    let commands = this.commandProvider.getAllCommands()

    for (let v of commands) {
      if (v.getName() === command && v.getProvider() === provider) {
        let parameterType = parameter.map(object => {
          return object.getType()
        })

        let types = v.getParameterTypes()
        for (const i in types) {
          for (const j in types[i]) {
            if(types[i][j] === ParameterType.UNLIMITED_STRING) {
              let newParameter = parameter.splice(0, j)
              newParameter.push(new Parameter(ParameterType.UNLIMITED_STRING, parameter.map(o => {
                return o.getValue()
              }).join(' ')))

              v.execute(Number(i), sender, newParameter)

              return
            } else if (types[i][j] !== parameterType[j]) {
              break
            }
          }

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
