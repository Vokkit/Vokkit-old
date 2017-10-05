const Client = require('./Client')

let client

class Vokkit {
  static init (plugins) {
    client = new Client(plugins)
    client.loginInit()
  }
  static getClient () {
    return client
  }
}

module.exports = Vokkit
