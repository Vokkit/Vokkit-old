class EventPriority {
  static get HIGHEST () {
    return 5
  }

  static get HIGH () {
    return 4
  }

  static get NORMAL () {
    return 3
  }

  static get LOW () {
    return 2
  }

  static get LOWEST () {
    return 1
  }

  static get MONITOR () {
    return 0
  }
}

module.exports = EventPriority
