const Command = require('./Command.js')

class ExitCommand extends Command {
  constructor () {
    super('exit', '서버를 종료합니다.', '/exit', [
      []
    ])
  }

  execute (parameterNumber, sender, parameter) {
    switch (parameterNumber) {
      case 0:
        sender.sendMessage('서버를 종료합니다.')
        process.exit()
        // You don't have to use 'break', because is is unreachable code.
      default:
        sender.sendMessage(this.getUsage())
        break
    }
  }
}

module.exports = ExitCommand
