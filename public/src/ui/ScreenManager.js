let ScreenProvider = require('../UI/ScreenProvider.js')
let ScreenChooser = require('../UI/ScreenChooser.js')

let MainScreen = require('../UI/screens/MainScreen.js')
let MainUIScreen = require('../UI/screens/MainUIScreen.js')
let ChatScreen = require('../UI/screens/ChatScreen.js')
let LoadScreen = require('../UI/screens/LoadScreen.js')
let LoginScreen = require('../UI/screens/LoginScreen.js')
let PauseScreen = require('../UI/screens/PauseScreen.js')
let InventoryScreen = require('../UI/screens/InventoryScreen.js')

class ScreenManager {
  constructor () {
    this.screenProvider = new ScreenProvider()
    this.screenChooser = new ScreenChooser(this.screenProvider)
  }

  init () { // register screens
    this.screenProvider.register(new MainScreen())
    this.screenProvider.register(new MainUIScreen())
    this.screenProvider.register(new ChatScreen())
    this.screenProvider.register(new LoadScreen())
    this.screenProvider.register(new LoginScreen())
    this.screenProvider.register(new PauseScreen())
    this.screenProvider.register(new InventoryScreen())
  }

  getScreen (screenName) {
    return this.screenChooser.getScreen(screenName)
  }

  getNowScreen () {
    return this.screenChooser.getNowScreen()
  }

  addScreen (screenName) {
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
