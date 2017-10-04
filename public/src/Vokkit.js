import Client from './Client'

let client

export default class Vokkit {
  static init (plugins) {
    client = new Client(plugins)
    client.loginInit()
  }
  static getClient () {
    return client
  }
}
