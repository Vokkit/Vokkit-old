let ParameterType = require('./ParameterType.js')

class Parameter {
  constructor(type, value) {
    this.type = type
    this.value = Parameter.toParameter(type, value)
  }

  static toParameter(type, str) {
    switch(type) {
      case ParameterType.INTEGER: case ParameterType.FLOAT:
        return Number(str)
        break
      case ParameterType.PLAYER:
        return Vokkit.getServer().getPlayer(str)
        break
      case ParameterType.BOOLEAN:
        return str === 'true'
        break
      default:
        return str
    }
  }

  getType() {
    return this.type
  }

  getValue() {
    return this.value
  }
}

module.exports = Parameter
