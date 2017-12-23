let ScreenProvider = require('../ui/ScreenProvider.js')
let ScreenChooser = require('../ui/ScreenChooser.js')

let MainScreen = require('../ui/screens/MainScreen.js')
let MainUIScreen = require('../ui/screens/MainUIScreen.js')
let ChatScreen = require('../ui/screens/ChatScreen.js')
let LoadScreen = require('../ui/screens/LoadScreen.js')
let LoginScreen = require('../ui/screens/LoginScreen.js')
let PauseScreen = require('../ui/screens/PauseScreen.js')
let InventoryScreen = require('../ui/screens/InventoryScreen.js')

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
