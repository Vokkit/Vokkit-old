class Screen {
  constructor (name, type, inputBinder) {
    this.name = name
    this.type = type // base, stack
    this.inputBinder = inputBinder
    this.dom = document.createElement('div')
  }

  getName () {
    return this.name
  }

  getInputBinder () {
    return this.inputBinder
  }

  show () {
    document.body.appendChild(this.dom)
  }

  dismiss () {
    document.body.removeChild(this.dom)
  }
}

module.exports = Screen
