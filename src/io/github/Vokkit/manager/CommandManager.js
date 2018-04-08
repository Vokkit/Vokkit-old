const ServerCommandEvent = require('../event/server/ServerCommandEvent.js')
const SocketManager = require('./SocketManager.js')
const Parameter = require('../command/parameter/Parameter.js')
const ParameterType = require('../command/parameter/ParameterType.js')
const PlayerCommandSender = require('../command/PlayerCommandSender.js')
const ConsoleCommandSender = require('../command/ConsoleCommandSender.js')
const CommandProvider = require('../command/CommandProvider.js')
const CommandExecutor = require('../command/CommandExecutor.js')

const HelpCommand = require('../command/commands/HelpCommand.js')
const TeleportCommand = require('../command/commands/TeleportCommand.js')
const StopCommand = require('../command/commands/StopCommand.js')
const SayCommand = require('../command/commands/SayCommand.js')
const TellCommand = require('../command/commands/TellCommand.js')
const SetBlockCommand = require('../command/commands/SetBlockCommand.js')
const KickCommand = require('../command/commands/KickCommand.js')

function callCommand (commandManager, socket, data) {
  let player = Vokkit.getServer().getPlayerById(socket.id)

  let messageBlocks = data.message.split(' ')

  let command = messageBlocks.shift()
  let primitiveParameter = messageBlocks

  let parameterType = ParameterType.toType(primitiveParameter)
  let parameter = parameterType.map((object, i) => {
    return new Parameter(object, primitiveParameter[i])
  })

  let sender = (player === null) ? new ConsoleCommandSender() : new PlayerCommandSender(player)

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
    this.commandProvider.register(new StopCommand())
    this.commandProvider.register(new SayCommand())
    this.commandProvider.register(new TellCommand())
    this.commandProvider.register(new SetBlockCommand())
    this.commandProvider.register(new KickCommand())
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
