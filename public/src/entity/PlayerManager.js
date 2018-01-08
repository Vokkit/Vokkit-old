const Player = require('./Player')
const LocalPlayer = require('./LocalPlayer')

class PlayerManager {
  constructor () {
    const socket = Vokkit.getClient().getSocket()
    socket.on('playerJoin', this.addPlayer)
    socket.on('playerQuit', this.removePlayer)
    socket.on('playerData', this.setPlayerData)
  }

  addPlayer (data, ignoreLocal) {
    const socket = Vokkit.getClient().getSocket()
    if (Vokkit.getClient().getLoginManager().isLogined() && (ignoreLocal || !(socket.id === data.id))) Vokkit.getClient().addPlayer(data.id === socket.id ? LocalPlayer.fromObject(data, socket) : Player.fromObject(data, socket))
  }

  removePlayer (data) {
    if (Vokkit.getClient().getLoginManager().isLogined()) Vokkit.getClient().removePlayer(data.id)
  }

  setPlayerData (data) {
    const players = Vokkit.getClient().getOnlinePlayers()
    for (const i in players) {
      if (players[i].getId() === data.id) {
        for (const j in data) {
          if (j === 'health') players[i].setHealth(data.health)
          if (j === 'gameMode') players[i].setGameMode(data.gameMode)
          if (players[i] instanceof LocalPlayer) {
            if (j === 'selectedSlotId') players[i].setSelectedSlotId(data.selectedSlotId)
          }
        }
      }
    }
  }
}

module.exports = PlayerManager
