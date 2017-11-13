class ParameterType {
  static get STRING () {
    return 'string'
  }

  static get NUMBER () {
    return 'number'
  }

  static get PLAYER () {
    return 'player'
  }

  static get BOOLEAN () {
    return 'boolean'
  }

  static toType (parameter) {
    let result = []

    for (let v of parameter) {
      if (!isNaN(v)) {
        result.push(ParameterType.NUMBER)
      } else if (Vokkit.getServer().getPlayer(v) != null) {
        result.push(ParameterType.PLAYER)
      } else {
        if (v === 'true' || v === 'false') { result.push(ParameterType.BOOLEAN) } else { result.push(ParameterType.STRING) }
      }
    }

    return result
  }
}

module.exports = ParameterType
