class ParameterType {
  static get STRING() {
    return 'string'
  }

  static get INTEGER() {
    return 'integer'
  }

  static get FLOAT() {
    return 'integer' | 'float'
  }

  static get PLAYER() {
    return 'player'
  }

  static get BOOLEAN() {
    return 'boolean'
  }

  static toType(parameter) {
    let result = []

    for(let v of parameter) {
      if(Number(v) == v) {
        v = Number(v)
        if(v === Math.floor(v))
          result.push(ParameterType.INTEGER)
        else
          result.push(ParameterType.FLOAT)
      } else if(Vokkit.getServer().getPlayer(v) != null) {
        result.push(ParameterType.PLAYER)
      } else {
        if(v === 'true' || v === 'false')
          result.push(ParameterType.BOOLEAN)
        else
          result.push(ParameterType.STRING)
      }
    }

    return result
  }
}

module.exports = ParameterType
