class ScreenChooser {
  constructor (screenProvider) {
    this.now = null
    this.lastScreens = []

    this.screenProvider = screenProvider
  }

  setScreen (screen) {
    screen = this.getScreen(screen)

    this.lastScreens.push(this.now)
    this.now = screen
  }

  getScreen (name) {
    for (let screen of this.screenProvider.getAllScreens()) {
      if (screen.getName() === name) {
        return screen
      }
    }

    return null
  }

  popScreen () {
    this.screen = this.lastScreens.pop()
  }

  getNowScreen () {
    return this.now
  }
}

module.exports = ScreenChooser
