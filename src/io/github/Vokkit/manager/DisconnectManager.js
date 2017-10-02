const PlayerQuitEvent = require('../event/player/PlayerQuitEvent.js')

const SocketManager = require('./SocketManager.js')

class DisconnectManager extends SocketManager {
  addListener (socket) {
    socket.on('disconnect', function (data) {
      let player = Vokkit.getServer().getPlayerById(socket.id)
      let playerList = Vokkit.getServer().getPlayers()
      if (player !== undefined) {
        for (let i in playerList) {
          if (playerList[i].equals(player)) {
            let playerQuitEvent = new PlayerQuitEvent(player, '%s님이 게임을 떠났습니다.')
            Vokkit.getServer().getPluginManager().makeEvent(playerQuitEvent)
            Vokkit.getServer().removePlayer(player)
            let address = socket.request.connection._peername
            Vokkit.getServer().getLogger().info(player.getName() + '[' + address.address + ':' + address.port + '] 이가 로그아웃 했습니다.')
            Vokkit.getServer().getSocketServer().emit('playerQuit', {
              id: player.getId()
            })
            return
          }
        }
      }
    })
  }
}

module.exports = DisconnectManager
