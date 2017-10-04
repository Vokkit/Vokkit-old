var World = require('../World.js')

var loginButton
var idText

function LoginManager () {
  var loginManager = this
  var socket
  var logined = false
  this.isLogined = function () {
    return logined
  }
  this.init = function () {
    socket = Vokkit.getClient().getSocket()
    loginButton = document.getElementById('loginButton')
    idText = document.getElementById('idText')
    socket.on('loginResult', function (data) {
      if (!data.succeed) {
        alert('로그인 실패! 이유: ' + data.reason)
      } else {
        logined = true
        World.prepareWorlds(data.worlds)
        var playerManager = Vokkit.getClient().getPlayerManager()
        for (var i in data.players) {
          playerManager.addPlayer(data.players[i], true)
        }
        loginManager.onLogin()
      }
    })
    loginButton.onclick = function () {
      loginManager.requestLogin(idText.value)
    }
  }
  this.requestLogin = function (id) {
    if (id == '') {
      return false
    }
    var type
    var uAgent = navigator.userAgent.toLowerCase()
    var mobilePhones = ['iphone', 'ipod', 'ipad', 'android', 'blackberry', 'windows ce', 'nokia', 'webos', 'opera mini', 'sonyericsson', 'opera mobi', 'iemobile']
    for (var i in mobilePhones) {
      if (uAgent.indexOf(mobilePhones[i]) != -1) {
        type = 'Mobile'
        break
      } else type = 'PC'
    }
    socket.emit('login', {
      name: id,
      type: type
    })
  }
}

module.exports = LoginManager
