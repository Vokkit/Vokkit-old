const CommandSender = require('./CommandSender.js')

class ConsoleCommandSender extends CommandSender {
  constructor() {
    super()
    this.name = 'Console'
  }

  sendMessage(message) {
    Vokkit.getServer().getLogger().chat(message)
  }
}

module.exports = ConsoleCommandSender
