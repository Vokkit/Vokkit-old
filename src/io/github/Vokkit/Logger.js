const caller = require('caller-id')
const readline = require('readline')

function getTime () {
  const date = new Date()
  let hour = date.getHours()
  hour = (hour < 10 ? '0' : '') + hour
  let min = date.getMinutes()
  min = (min < 10 ? '0' : '') + min
  let sec = date.getSeconds()
  sec = (sec < 10 ? '0' : '') + sec
  return hour + ':' + min + ':' + sec
}

class Logger {
}

// 메서드가 아닌 함수로 작성한 이유는 caller-id를 사용하기 위해서입니다. (메서드에 caller이 없기 때문에)
Logger.prototype.info = function (message) {
  readline.clearLine(process.stdout)
  readline.cursorTo(process.stdout, 0)
  let path = caller.getData().filePath
  if (path.indexOf('Vokkit\\plugins\\') !== -1) {
    let pluginName = path.split('Vokkit\\plugins\\')[1].split('\\')[0]
    process.stdout.write('\x1b[1m\x1b[36m' + getTime() + '\x1b[37m [INFO] [' + pluginName + '] ' + message + '\x1b[0m\n> ')
    return
  }
  process.stdout.write('\x1b[1m\x1b[36m' + getTime() + '\x1b[37m [INFO] ' + message + '\x1b[0m\n> ')
}

Logger.prototype.warn = function (message) {
  readline.clearLine(process.stdout)
  readline.cursorTo(process.stdout, 0)
  let path = caller.getData().filePath
  if (path.indexOf('Vokkit\\plugins\\') !== -1) {
    let pluginName = path.split('Vokkit\\plugins\\')[1].split('\\')[0]
    process.stdout.write('\x1b[1m\x1b[36m' + getTime() + '\x1b[31m [Warn] [' + pluginName + '] ' + message + '\x1b[0m\n> ')
    return
  }
  process.stdout.write('\x1b[1m\x1b[36m' + getTime() + '\x1b[31m [Warn] ' + message + '\x1b[0m\n> ')
}

Logger.prototype.chat = function (message) {
  readline.clearLine(process.stdout)
  readline.cursorTo(process.stdout, 0)
  let path = caller.getData().filePath
  if (path.indexOf('Vokkit\\plugins\\') !== -1) {
    let pluginName = path.split('Vokkit\\plugins\\')[1].split('\\')[0]
    process.stdout.write('\x1b[1m\x1b[36m' + getTime() + '\x1b[37m [' + pluginName + '] ' + message + '\x1b[0m\n> ')
    return
  }
  process.stdout.write('\x1b[1m\x1b[36m' + getTime() + '\x1b[37m ' + message + '\x1b[0m\n> ')
}

module.exports = Logger
