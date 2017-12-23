const PlayerChatEvent = require('../event/player/PlayerChatEvent')

const SocketManager = require('./SocketManager.js')
const Lang = require('../lang/Lang')

class ChatManager extends SocketManager {
  addListener (socket) {
    socket.on('broadcast', function (data) {
      let player = Vokkit.getServer().getPlayerById(socket.id)
      let allPlayers = Vokkit.getServer().getPlayers()
      let message = data.message
      let playerChatEvent = new PlayerChatEvent(player, message)

      Vokkit.getServer().getPluginManager().makeEvent(playerChatEvent)
      if (!playerChatEvent.isCancelled()) {
        for (const p of allPlayers) {
          p.sendMessage(`<${playerChatEvent.getPlayer().getName()}> ${playerChatEvent.getMessage()}`)
        }
      }
    })

    socket.on('chat', function (data) {
      let player = Vokkit.getServer().getPlayerById(socket.id)
      let message = data.message
      let playerChatEvent = new PlayerChatEvent(player, message)

      Vokkit.getServer().getPluginManager().makeEvent(playerChatEvent)
      if (!playerChatEvent.isCancelled()) {
        player.sendMessage(`<${playerChatEvent.getPlayer().getName()}> ${playerChatEvent.getMessage()}`)
      }
    })
  }

  sendSystemMessage (message) {
    Vokkit.getServer().getSocketServer().emit('broadcast', {
      message: Lang.format('system.message.format', [message.toString()])
    })
  }

  broadcast (message) {
    const players = Vokkit.getServer().getPlayers()

    for (const player of players) {
      player.sendMessage(message)
    }
  }
}

module.exports = ChatManager
