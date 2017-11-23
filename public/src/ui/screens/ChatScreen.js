const Screen = require('../Screen.js')
const InputBinder = require('../InputBinder.js')

class ChatScreen extends Screen {
  constructor () {
    super('ChatScreen', 'stack', new InputBinder())

    this.saved = ""

    this.init()
    this.initInput()
  }

  init () {
    this.dom.innerHTML = (
      '<div id="chatWindow" style="width: 100vw; height: 100vh;">' +
        '<div id="chatLog" style="overflow:auto; width: 100%; border: 0px; padding: 8px; height: calc(100% - 46px); cursor: pointer; background-color: rgba(0, 0, 0, 0.25); color: rgb(255, 255, 255);">' +
        '</div>' +
      '<div id="chatInput">' +
        '<input id="chatText" style="bottom: 0px; width: calc(100% - 30px); height:30px; padding: 8px; font-size: 15px;"></input>' +
        '<button id="chatButton" style="position:fixed; right:0px; bottom:0px; width: 30px; height:30px; font-size: 15px;">' +
          '→' +
        '</button>' +
      '</div>' +
    '</div>')
  }

  initInput () {
    this.inputBinder.setKeyDownListener(event => {
      switch (event.keyCode) {
        case 27: // esc
          Vokkit.getClient().getScreenManager().getScreenChooser().popScreen()

          const MainScreen = Vokkit.getClient().getScreenManager().getScreen('MainScreen')
          MainScreen.dom.requestPointerLock()
          break
        case 13: // enter
          let name = Vokkit.getClient().getLocalPlayer().getName()
          let text = document.getElementById('chatText').value

          if (text[0] == '/') {
            Vokkit.getClient().getChatManager().sendCommand(name, text.replace('/', ''))
          } else {
            Vokkit.getClient().getChatManager().sendChat(name, text)
          }

          document.getElementById('chatText').value = ''
          break
      }
    })
  }

  syncChat () {
    document.getElementById('chatLog').innerText += this.saved
    this.saved = ""
  }

  addChat (sender, message, format) {
    const chatLog = document.getElementById('chatLog')

    if (chatLog != null) {
      this.syncChat()
      chatLog.innerText += format.replace('%s', sender).replace('%s', message)
    } else {
      this.saved += format.replace('%s', sender).replace('%s', message)
    }
  }
}

module.exports = ChatScreen
