const CommandSender = require('./CommandSender.js')

class ConsoleCommandSender extends CommandSender {
  constructor () {
    super()
    this.name = 'console'
  }

  getName () {
    return this.name
  }

  sendMessage (sender, message, format = '<%s> %s\n') {
    Vokkit.getServer().getLogger().chat(format.replace('%s', sender).replace('%s', message))
  }

  broadcast (sender, message, format = '[%s] %s\n') {
    Vokkit.getServer().getLogger().chat(format.replace('%s', sender).replace('%s', message))
    Vokkit.getServer().getSocketServer().emit('chat', {
      id: null,
      sender: this.name,
      message: message.toString(),
      format: format
    })
  }
}

module.exports = ConsoleCommandSender
