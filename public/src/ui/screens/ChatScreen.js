const Screen = require('../Screen.js')
const InputBinder = require('../InputBinder.js')

class ChatScreen extends Screen {
  constructor () {
    super('ChatScreen', 'stack', new InputBinder())

    this.init()
    this.initInput()
  }

  init () {
    this.dom.innerHTML = (
      '<div id="chatWindow" style="position:fixed; width:100%; height:100%;">' +
        '<div id="chatLog" style="width: 100%; border: 0px; padding: 8px; height: calc(100% - 46px);cursor: pointer; position:absolute;background-color: rgba(0, 0, 0, 0.25); color: rgb(255, 255, 255); font-family: sans-serif; font-size: 15px; font-style: normal; z-index: 999;">' +
        '</div>' +
      '<div id="chatInput">' +
        '<input id="chatText" style="width: calc(100% - 30px); height:30px; border: 0px; padding: 8px; cursor: pointer; position:absolute;background-color: rgba(0, 0, 0, 0.5); color: rgb(255, 255, 255); font-family: sans-serif; font-size: 15px; font-style: normal; z-index: 999;"></input>' +
        '<button id="chatButton" style="position:fixed;right:0px;bottom:0px;width: 30px;height:30px;">' +
          '→' +
        '</button>' +
      '</div>' +
    '</div>')
  }

  initInput () {
    this.inputBinder.setKeyDownListener(event => {
      switch (event.keyCode) {
        case 27: //esc
          Vokkit.getClient().getScreenManager().getScreenChooser().popScreen()
        break
        case 13: //enter
          let name = Vokkit.getClient().getLocalPlayer().getName()
          let text = this.dom.getElementById('chatText').value
          if(text[0] == '/')
            Vokkit.getClient().getChatManager().sendCommand(name, text.replace('/', ''))
          else
            Vokkit.getClient().getChatManager().sendChat(name, text)
        break
      }
    })
  }
}

module.exports = ChatScreen
