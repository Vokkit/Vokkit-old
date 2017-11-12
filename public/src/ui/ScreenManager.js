let ScreenProvider = require('../UI/ScreenProvider.js')
let ScreenChooser = require('../UI/ScreenChooser.js')

let MainScreen = require('../UI/screens/MainScreen.js')

class ScreenManager {
  constructor() {
    this.screenProvider = new ScreenProvider()
    this.screenChooser = new ScreenChooser(this.screenProvider)
  }

  init () { // register screens
    this.screenProvider.register(new MainScreen())
  }

  getScreen (screenName) {
    return this.screenChooser.getScreen(screenName)
  }

  getNowScreen () {
    return this.screenChooser.getNowScreen()
  }

  setScreen (screenName) {
    this.screenChooser.setScreen(screenName)
    this.screenChooser.getNowScreen().init()
  }

  getScreenProvider () {
    return this.screenProvider
  }

  getScreenChooser () {
    return this.screenChooser
  }
}

module.exports = ScreenManager
