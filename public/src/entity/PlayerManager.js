var Player = require('./Player')
var Location = require('../Location')

function PlayerManager () {
  var socket
  var playerManager = this
  socket = Vokkit.getClient().getSocket()
  socket.on('playerJoin', playerManager.addPlayer)
  socket.on('playerQuit', playerManager.removePlayer)
  this.addPlayer = function (data, ignoreLocal) {
    if (Vokkit.getClient().getLoginManager().isLogined() && (ignoreLocal || !(socket.id === data.id))) Vokkit.getClient().addPlayer(Player.fromObject(data))
  }
  this.removePlayer = function (data) {
    if (Vokkit.getClient().getLoginManager().isLogined()) Vokkit.getClient().removePlayer(data.id)
  }
}

module.exports = PlayerManager
