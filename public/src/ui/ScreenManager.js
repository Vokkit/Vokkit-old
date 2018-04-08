const ScreenProvider = require('../ui/ScreenProvider.js')
const ScreenChooser = require('../ui/ScreenChooser.js')

const MainScreen = require('../ui/screens/MainScreen.js')
const MainUIScreen = require('../ui/screens/MainUIScreen.js')
const ChatScreen = require('../ui/screens/ChatScreen.js')
const LoadScreen = require('../ui/screens/LoadScreen.js')
const LoginScreen = require('../ui/screens/LoginScreen.js')
const PauseScreen = require('../ui/screens/PauseScreen.js')
const InventoryScreen = require('../ui/screens/InventoryScreen.js')
const DisconnectScreen = require('../ui/screens/DisconnectScreen.js')

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
    this.screenProvider.register(new DisconnectScreen())
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
