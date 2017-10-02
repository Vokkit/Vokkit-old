let ServerCommandEvent = require('../event/server/ServerCommandEvent.js')
let SocketManager = require('./SocketManager.js')
let Parameter = require('../command/parameter/Parameter.js')
let ParameterType = require('../command/parameter/ParameterType.js')
let CommandSender = require('../command/CommandSender.js')
let ConsoleCommandSender = require('../command/ConsoleCommandSender.js')
let CommandProvider = require('../command/CommandProvider.js')
let CommandExecutor = require('../command/CommandExecutor.js')

let HelpCommand = require('../command/commands/HelpCommand.js')
let TeleportCommand = require('../command/commands/TeleportCommand.js')
let ExitCommand = require('../command/commands/ExitCommand.js')

function callCommand (commandManager, socket, data) {
  let player = Vokkit.getServer().getPlayerById(socket.id)

  let messageBlocks = data.message.split(' ')

  let command = messageBlocks.shift()
  let primitiveParameter = messageBlocks

  let parameterType = ParameterType.toType(primitiveParameter)
  let parameter = parameterType.map((object, i) => {
    return new Parameter(object, primitiveParameter[i])
  })

  let sender = (player == null) ? new ConsoleCommandSender() : new CommandSender(player)

  let serverCommandEvent = new ServerCommandEvent(sender, command, parameter)

  Vokkit.getServer().getPluginManager().makeEvent(serverCommandEvent)
  if (!serverCommandEvent.isCancelled()) {
    commandManager.commandExecutor.execute(sender, command, parameter) // CommandSender string Parameter
  }
}

class CommandManager extends SocketManager {
  constructor () {
    super()
    this.commandProvider = new CommandProvider()
    this.commandExecutor = new CommandExecutor(this.commandProvider)
  }

  init () {
    this.commandProvider.register(new HelpCommand())
    this.commandProvider.register(new TeleportCommand())
    this.commandProvider.register(new ExitCommand())
  }

  addListener (socket) {
    socket.on('command', data => {
      callCommand(this, socket, data)
    })
  }

  call (message) {
    callCommand(this, { id: null }, { message: message })
  }

  getCommandProvider () {
    return this.commandProvider
  }

  getCommandExecutor () {
    return this.commandExecutor
  }
}

module.exports = CommandManager
