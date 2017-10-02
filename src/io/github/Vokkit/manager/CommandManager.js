let ServerCommandEvent = require('../event/server/ServerCommandEvent.js')
let SocketManager = require('./SocketManager.js')
let Parameter = require('../command/parameter/Parameter.js')
let ParameterType = require('../command/parameter/ParameterType.js')
let CommandSender = require('../command/CommandSender.js')
let CommandExecutor = require('../command/CommandExecutor.js')

function run(socket, data) {
  let player = Vokkit.getServer().getPlayerById(socket.id)

  let message = data.message.split(' ')

  let command = message.shift()
  let primitiveParameter = message
  let parameterType = ParameterType.toType(primitiveParameter)
  let parameter = []

  let i = 0
  for(let v of parameterType) {
    parameter.push(new Parameter(v, primitiveParameter[i]))
    i++
  }

  let sender = new CommandSender(player)
  let serverCommandEvent = new ServerCommandEvent(sender, command, parameter)

  Vokkit.getServer().getPluginManager().makeEvent(serverCommandEvent)
  if (!serverCommandEvent.isCancelled()) {
    CommandExecutor.execute(sender, command, parameter)
  }
}

class CommandManager extends SocketManager {
  addListener(socket) {
    socket.on('command', data => {
      run(socket, data)
    })
  }

  static call(message) {
    run({id: null}, {message: message})
  }
}

module.exports = CommandManager
