const Screen = require('../Screen.js')
const InputBinder = require('../InputBinder.js')
const Lang = require('../../lang/Lang')

class DisconnectScreen extends Screen {
  constructor () {
    super('DisconnectScreen', 'base', new InputBinder())

    this.init()
    this.initInput()
  }

  init () {
    this.dom.innerHTML = (
      '<div id="disconnect" class="background">' +
      '<div id="disconnect-text" style="text-align: center; color: white;"> ' + Lang.format('disconnect_kicked') + ' </div>'+
      '<button id="disconnect-ok" style="text-align: center;"> </button>' +
      '</div>'
    )
  }

  initInput () {

  }
}

module.exports = DisconnectScreen
