const Server = require('./Server.js')
const Logger = new (require('./Logger.js'))()
const Lang = require('./lang/Lang')
const fs = require('fs')

let server

class Vokkit {
  static init () {
    if (!fs.existsSync('./server.properties')) {
      fs.writeFileSync('./server.properties', JSON.stringify({
        language: 'en'
      }))
    }
    const properties = JSON.parse(fs.readFileSync('./server.properties'))
    Lang.setLanguage(properties.language)
    var now = new Date().getTime()
    Logger.info(Lang.format('server_preparing', [Server.version]))
    server = new Server()
    server.init(now)
  }

  static getServer () {
    return server
  }
}

module.exports = Vokkit
