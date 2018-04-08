const World = require('../world/World')
const Lang = require('../lang/Lang')

class LoginManager {
  constructor (client) {
    this.logined = false
    this.socket = Vokkit.getClient().getSocket()
    this.socket.on('loginResult', (data) => {
      if (!data.succeed) {
        alert(Lang.format('login.fail'), [data.reason])
      } else {
        Vokkit.getClient().getScreenManager().addScreen('LoadScreen')
        // 딜레이를 안 주면 로딩화면이 안 생긴다.
        setTimeout(() => {
          this.logined = true
          World.prepareWorlds(data.worlds)
          const playerManager = Vokkit.getClient().getPlayerManager()
          for (const i in data.players) {
            playerManager.addPlayer(data.players[i], true)
          }
          this.logined = true
          client.init()
        }, 50)
      }
    })
    this.socket.on('playerQuit', data => {
      Vokkit.getClient().getLocalPlayer().disconnect()
    })
  }

  isLogined () {
    return this.logined
  }

  requestLogin (id) {
    if (id === '') {
      alert(Lang.format('login.empty_id'))
      return false
    }
    if (id.length >= 20) {
      alert(Lang.format('login.long_id'))
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
