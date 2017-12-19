const Player = require('./Player')
const LocalPlayer = require('./LocalPlayer')

class PlayerManager {
  constructor () {
    const socket = Vokkit.getClient().getSocket()
    socket.on('playerJoin', this.addPlayer)
    socket.on('playerQuit', this.removePlayer)
    socket.on('playerSetHealth', this.setHealth)
  }

  addPlayer (data, ignoreLocal) {
    console.log(data)
    const socket = Vokkit.getClient().getSocket()
    if (Vokkit.getClient().getLoginManager().isLogined() && (ignoreLocal || !(socket.id === data.id))) Vokkit.getClient().addPlayer(data.id === socket.id ? LocalPlayer.fromObject(data, socket) : Player.fromObject(data, socket))
  }

  removePlayer (data) {
    if (Vokkit.getClient().getLoginManager().isLogined()) Vokkit.getClient().removePlayer(data.id)
  }

  setHealth (data) {
    const players = Vokkit.getClient().getOnlinePlayers()
    for (const i in players) {
      if (players[i].getId() === data.id) players[i].setHealth(data.health)
    }
  }
}

module.exports = PlayerManager
