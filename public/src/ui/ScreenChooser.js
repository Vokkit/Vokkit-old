class ScreenChooser {
  constructor (screenProvider) {
    this.now = null
    this.lastScreens = []

    this.screenProvider = screenProvider
  }

  setScreen (screen) {
    screen = this.getScreen(screen)
    screen.show()

    if (this.now !== null && this.now.type !== 'base') {
      this.now.dismiss()
    }

    this.lastScreens.push(this.now)
    this.now = screen

    Vokkit.getClient().getInputManager().setInput()
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
    if (this.now.type !== 'base') { this.now.dismiss() }

    this.now = this.lastScreens.pop()
    this.now.show()

    Vokkit.getClient().getInputManager().setInput()
  }

  getNowScreen () {
    return this.now
  }
}

module.exports = ScreenChooser
