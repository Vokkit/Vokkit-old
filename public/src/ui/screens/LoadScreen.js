const Screen = require('../Screen.js')
const InputBinder = require('../InputBinder.js')

class LoadScreen extends Screen {
  constructor () {
    super('LoadScreen', 'stack', new InputBinder())

    this.init()
  }

  init () {
    this.dom.innerHTML = (
      '<div id="load" class="background">' +
        '<div style="position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);color:white">월드를 불러오는 중</div>' +
      '</div>'
    )
  }
}

module.exports = LoadScreen
