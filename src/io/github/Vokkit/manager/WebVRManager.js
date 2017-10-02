function WebVRManager () {
  this.getListener = function (socket, listenerName) {
    if (listenerName === 'VRStart') {
      return function () {
        let player = Vokkit.getServer().getPlayerById(socket.id)
        player.setVRMode(true)
        player.getSocket().emit('VRStart')
      }
    } else if (listenerName === 'VREnd') {
      return function () {
        let player = Vokkit.getServer().getPlayerById(socket.id)
        player.setVRMode(true)
        player.getSocket().emit('VREnd')
      }
    }
  }
}

module.exports = WebVRManager
