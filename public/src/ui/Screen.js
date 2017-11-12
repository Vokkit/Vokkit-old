class Screen {
  constructor (name, inputBinder) {
    this.name = name
    this.inputBinder = inputBinder
  }

  getName () {
    return this.name
  }

  getInputBinder () {
    return this.inputBinder
  }
}

module.exports = Screen
