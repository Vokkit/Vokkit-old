class CommandProvider {
  constructor () {
    this.commands = []
  }

  register (command) {
    this.commands.push(command)
  }

  unregister (command) {
    for (let i in this.commands) {
      if (this.commands[i].getName() === command.getName()) {
        this.commands.splice(i, 1)

        return
      }
    }
  }

  getAllCommands () {
    return this.commands
  }
}

module.exports = CommandProvider
