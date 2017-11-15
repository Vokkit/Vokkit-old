let ScreenProvider = require('../UI/ScreenProvider.js')
let ScreenChooser = require('../UI/ScreenChooser.js')

let MainScreen = require('../UI/screens/MainScreen.js')
let MainUIScreen = require('../UI/screens/MainUIScreen.js')
let ChatScreen = require('../UI/screens/ChatScreen.js')

class ScreenManager {
  constructor () {
    this.screenProvider = new ScreenProvider()
    this.screenChooser = new ScreenChooser(this.screenProvider)
  }

  init () { // register screens
    this.screenProvider.register(new MainScreen())
    this.screenProvider.register(new MainUIScreen())
    this.screenProvider.register(new ChatScreen())
  }

  getScreen (screenName) {
    return this.screenChooser.getScreen(screenName)
  }

  getNowScreen () {
    return this.screenChooser.getNowScreen()
  }

  addScreen (screenName) {
    this.getScreen(screenName).init()
    this.screenChooser.setScreen(screenName)
  }

  getScreenProvider () {
    return this.screenProvider
  }

  getScreenChooser () {
    return this.screenChooser
  }
}

module.exports = ScreenManager
