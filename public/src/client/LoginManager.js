const World = require('../world/World')

class LoginManager {
  constructor (client) {
    this.logined = false
    this.socket = Vokkit.getClient().getSocket()
    this.socket.on('loginResult', (data) => {
      if (!data.succeed) {
        alert('로그인 실패! 이유: ' + data.reason)
      } else {
        this.logined = true
        World.prepareWorlds(data.worlds)
        const playerManager = Vokkit.getClient().getPlayerManager()
        for (const i in data.players) {
          playerManager.addPlayer(data.players[i], true)
        }
        this.isLogined = true
        client.init()
      }
    })
    document.getElementById('loginButton').onclick = () => this.requestLogin(document.getElementById('idText').value)
  }

  isLogined () {
    return this.logined
  }

  requestLogin (id) {
    if (id === '') {
      return false
    }
    let type = 'PC'
    const uAgent = navigator.userAgent.toLowerCase()
    const mobilePhones = ['iphone', 'ipod', 'ipad', 'android', 'blackberry', 'windows ce', 'nokia', 'webos', 'opera mini', 'sonyericsson', 'opera mobi', 'iemobile']
    for (const i in mobilePhones) {
      if (uAgent.includes(mobilePhones[i])) {
        type = 'Mobile'
        break
      }
    }
    this.socket.emit('login', {
      name: id,
      type: type
    })
  }
}

module.exports = LoginManager
