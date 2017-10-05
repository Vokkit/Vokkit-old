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
        var playerManager = Vokkit.getClient().getPlayerManager()
        for (var i in data.players) {
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
    var type = 'PC'
    var uAgent = navigator.userAgent.toLowerCase()
    var mobilePhones = ['iphone', 'ipod', 'ipad', 'android', 'blackberry', 'windows ce', 'nokia', 'webos', 'opera mini', 'sonyericsson', 'opera mobi', 'iemobile']
    for (var i in mobilePhones) {
      if (uAgent.indexOf(mobilePhones[i]) !== -1) {
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
