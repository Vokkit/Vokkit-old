function WebVRManager() {
  this.getListener = function (socket, listenerName) {
    if (listenerName == 'VRStart') {
      return function () {
        var player = Vokkit.getServer().getPlayerById(socket.id)
        player.setVRMode(true)
        var player = Vokkit.getServer().getPlayer(player.getName())
        player.getSocket().emit('VRStart')
      }
    } else if (listenerName == 'VREnd') {
      return function () {
        var player = Vokkit.getServer().getPlayerById(socket.id)
        player.setVRMode(true)
        var player = Vokkit.getServer().getPlayer(player.getName())
        player.getSocket().emit('VREnd')
      }
    }
  }
}

module.exports = WebVRManager