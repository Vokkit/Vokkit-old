const PlayerQuitEvent = require('../event/player/PlayerQuitEvent.js')
const Server = require('../Server')

const SocketManager = require('./SocketManager.js')
const Lang = require('../lang/Lang')

class DisconnectManager extends SocketManager {
  addListener (socket) {
    socket.on('disconnect', function (data) {
      let player = Vokkit.getServer().getPlayerById(socket.id)
      let playerList = Vokkit.getServer().getPlayers()
      if (player !== undefined) {
        for (let i in playerList) {
          if (playerList[i].equals(player)) {
            let playerQuitEvent = new PlayerQuitEvent(player, Lang.format('player.quit.format'))
            Vokkit.getServer().getPluginManager().makeEvent(playerQuitEvent)
            Vokkit.getServer().removePlayer(player)
            let address = socket.request.connection._peername
            Vokkit.getServer().getLogger().info(Lang.format('player.quit.message', [player.getName(), address.address, address.port]))
            Vokkit.getServer().getSocketServer().emit('playerQuit', {
              id: player.getId()
            })
            Vokkit.getServer().getLogger().title(Lang.format('player.list.log', [Server.version, Vokkit.getServer().getPlayers().length]))
            Vokkit.getServer().getChatManager().broadcast(Lang.formatString(playerQuitEvent.getQuitMessage(), player.getName()))
            return
          }
        }
      }
    })
  }
}

module.exports = DisconnectManager
