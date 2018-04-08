const Screen = require('../Screen.js')
const InputBinder = require('../InputBinder.js')
const Lang = require('../../lang/Lang')
const ItemStack = require('../../item/ItemStack.js')

class ChatScreen extends Screen {
  constructor () {
    super('ChatScreen', 'stack', new InputBinder())

    this.saved = []

    this.init()
    this.initInput()
  }

  init () {
    this.dom.innerHTML = (
      '<div id="chatWindow" style="width: 100vw; height: 100vh;">' +
      '<div class="header" style="overflow:auto; width: 100%; height: 42px; text-align: center; line-height: 38px; cursor: pointer;">' +
      '<div style="position: absolute" class="flat-button">' +
      '< Back' +
      '</div>' +
      Lang.format('chat_title') +
      '</div>' +
      '<div id="chatLog" style="overflow:auto; width: 100%; border: 0px; padding: 4px; height: calc(100% - 48px - 42px - 10px); cursor: pointer; color: #F1F1F1; background-color: rgba(0, 0, 0, 0.25);">' +
      '</div>' +
      '<div id="chatInput">' +
      '<button id="chatButton" style="position: fixed; left: 0px; bottom: 0px; width: 48px; height: 48px;">' +
      '/' +
      '</button>' +
      '<input id="chatText" style="position: fixed; bottom: 0px; margin-left: 48px; width: calc(100% - 48px - 48px); height: 48px;"></input>' +
      '<button id="chatButton" style="position: fixed; right: 0px; bottom: 0px; width: 48px; height: 48px;">' +
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
          const text = document.getElementById('chatText').value

          if (text[0] === '/') {
            Vokkit.getClient().getChatManager().sendCommand(text.replace('/', ''))
          } else {
            Vokkit.getClient().getChatManager().sendChat(text)
            Vokkit.getClient().getLocalPlayer().getInventory().setItem(0, new ItemStack(2, 64))
            Vokkit.getClient().getLocalPlayer().getInventory().setItem(3, new ItemStack(7, 12))
            Vokkit.getClient().getLocalPlayer().getInventory().setItem(4, new ItemStack(3, 3))
            Vokkit.getClient().getLocalPlayer().getInventory().setItem(5, new ItemStack(4, 99))
          }

          document.getElementById('chatText').value = ''
          break
      }
    })
    this.dom.children[0].children[0].children[0].addEventListener('click', (event) => {
      Vokkit.getClient().getScreenManager().getScreenChooser().popScreen()

      const MainScreen = Vokkit.getClient().getScreenManager().getScreen('MainScreen')
      MainScreen.dom.requestPointerLock()
    })
  }

  syncChat () {
    const chatLog = document.getElementById('chatLog')
    for (const i in this.saved) chatLog.appendChild(this.saved[i])
    this.saved = []
  }

  addChat (message) {
    const chatLog = document.getElementById('chatLog')
    const p = document.createElement('p')
    p.innerText = message

    if (chatLog != null) {
      const maxScroll = chatLog.scrollHeight - chatLog.offsetHeight
      const now = chatLog.scrollTop
      const autoScroll = (Math.abs(maxScroll - now) <= 1)
      this.syncChat()
      chatLog.appendChild(p)
      if (autoScroll) chatLog.scrollTop += 100000
    } else {
      this.saved.push(p)
    }
  }
}

module.exports = ChatScreen
