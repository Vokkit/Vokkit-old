const Server = require('./Server.js')
const Logger = new (require('./Logger.js'))()

let server

class Vokkit {
  static init () {
    var now = new Date().getTime()
    Logger.info('Vokkit v' + Server.version + '이(가) 프로토콜 버전 ' + Server.protocolVersion + ' 에서 열립니다.')
    server = new Server()
    server.init(now)
  }

  static getServer () {
    return server
  }
}

module.exports = Vokkit
