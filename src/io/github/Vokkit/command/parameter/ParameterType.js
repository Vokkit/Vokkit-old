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

  static get UNLIMITED_STRING () {
    return 'unlimited_string'
  }

  static toType (parameter) {
    let result = []

    for (let v of parameter) {
      if (!isNaN(v) && v !== '') {
        result.push(ParameterType.NUMBER)
      } else if (Vokkit.getServer().getPlayer(v) != null) {
        result.push(ParameterType.PLAYER)
      } else {
        result.push((v === 'true' || v === 'false') ? ParameterType.BOOLEAN : ParameterType.STRING)
      }
    }

    return result
  }
}

module.exports = ParameterType
