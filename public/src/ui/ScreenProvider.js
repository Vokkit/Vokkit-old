class ScreenProvider {
  constructor () {
    this.screens = []
  }

  register (screen) {
    this.screens.push(screen)
  }

  unregister (screen) {
    for (let i in this.screens) {
      if (this.screens[i].getName() === screen.getName()) {
        this.screens.splice(i, 1)

        return
      }
    }
  }

  getAllScreens () {
    return this.screens
  }
}

module.exports = ScreenProvider
