class Util {
  static arrayEquals (a, b) {
    if (a === b) return true
    if (a === null || b === null) return false
    if (a.length !== b.length) return false

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false
    }

    return true
  }

  static equals (a, b) {
    if (Util.arrayEquals(a, b)) return true
    else return a === b
  }
}

module.exports = Util
