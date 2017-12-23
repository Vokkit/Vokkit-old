const Screen = require('../Screen.js')
const InputBinder = require('../InputBinder.js')
const Lang = require('../../lang/Lang')

class LoginScreen extends Screen {
  constructor () {
    super('LoginScreen', 'stack', new InputBinder())

    this.init()
    this.initInput()
  }

  init () {
    this.dom.innerHTML = (
      '<div id="load" class="background">' +
        '<div id="login" style="position: fixed;">' +
          '<input id="idText" type="text" style="position: absolute; width: 80vw; left: 10vw; top: 2vw; height: 4vw"></input>' +
          '<button id="loginButton" type="button" style="position: absolute; width: 80vw; left: 10vw; top: 8vw; height: 4vw">' + Lang.format('login.title') + '</button>' +
        '</div>' +
      '</div>'
    )
  }

  initInput () {
    this.dom.children[0].children[0].children[1].onclick = event => {
      Vokkit.getClient().getLoginManager().requestLogin(this.dom.children[0].children[0].children[0].value)
    }
  }
}

module.exports = LoginScreen
