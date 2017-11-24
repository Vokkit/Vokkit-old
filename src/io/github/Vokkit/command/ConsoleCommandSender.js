const CommandSender = require('./CommandSender.js')

class ConsoleCommandSender extends CommandSender {
  constructor () {
    super()
    this.name = 'console'
  }

  getName () {
    return this.name
  }

  sendMessage (message) {
    Vokkit.getServer().getLogger().chat(message)
  }

  broadcast (message) {
    Vokkit.getServer().getLogger().chat(message)
    Vokkit.getServer().getChatManager().broadcast(message)
  }
}

module.exports = ConsoleCommandSender
