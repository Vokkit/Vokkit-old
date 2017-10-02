const readline = require('readline')

const ConsoleCommandSender = require('./ConsoleCommandSender.js')

const CommandManager = require('../manager/CommandManager.js')

class ConsoleManager {
  init() {
    let sender = new ConsoleCommandSender()
    let rl = readline.createInterface(process.stdin, process.stdout)
    rl.setPrompt('> ')
    rl.prompt(true)
    rl.on('line', function (line) {
      Vokkit.getServer().getSocketManager().getCommandManager().call(line)
      rl.prompt()
    }).on('close', function () {
      process.exit(0)
    })
  }
}

module.exports = ConsoleManager
