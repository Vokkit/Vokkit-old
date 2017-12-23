const Screen = require('../Screen.js')
const InputBinder = require('../InputBinder.js')
const Lang = require('../../lang/Lang')

class PauseScreen extends Screen {
  constructor () {
    super('PauseScreen', 'stack', new InputBinder())

    this.init()
    this.initInput()
  }

  init () {
    this.dom.innerHTML = (
      '<div id="pause" style="width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.5);">' +
        '<div id="pause_actions" style="position: fixed;">' +
          '<button id="resume" type="button" style="position: absolute; width: 40vw; left: 10vw; top: 16vw; height: 8vw">' + Lang.format('pause.resume') + '</button>' +
          '<button id="quit" type="button" style="position: absolute; width: 40vw; left: 10vw; top: 28vw; height: 8vw">' + Lang.format('pause.quit') + '</button>' +
        '</div>' +
      '</div>'
    )
  }

  initInput () {
    this.dom.children[0].children[0].children[0].onclick = event => {
      Vokkit.getClient().getScreenManager().getScreenChooser().popScreen()

      const MainScreen = Vokkit.getClient().getScreenManager().getScreen('MainScreen')
      MainScreen.dom.requestPointerLock()
    }
    this.dom.children[0].children[0].children[1].onclick = event => {
      location.reload()
    }
  }
}

module.exports = PauseScreen
