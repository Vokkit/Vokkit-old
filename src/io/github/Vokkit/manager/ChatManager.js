const PlayerChatEvent = require('../event/player/PlayerChatEvent')

const SocketManager = require('./SocketManager.js')

class ChatManager extends SocketManager {
  addListener (socket) {
    socket.on('broadcast', function (data) {
      let player = Vokkit.getServer().getPlayerById(socket.id)
      let allPlayers = Vokkit.getServer().getPlayers()
      let sender = data.sender
      let message = data.message
      let format = data.format
      let playerChatEvent = new PlayerChatEvent(player, sender, message, format)

      Vokkit.getServer().getPluginManager().makeEvent(playerChatEvent)
      if (!playerChatEvent.isCancelled()) {
        for (const p of allPlayers) {
          p.sendMessage(playerChatEvent.getSender(), playerChatEvent.getMessage(), playerChatEvent.getFormat())
        }
      }
    })

    socket.on('chat', function (data) {
      let player = Vokkit.getServer().getPlayerById(socket.id)
      let allPlayers = Vokkit.getServer().getPlayers()
      let sender = data.sender
      let message = data.message
      let format = data.format
      let playerChatEvent = new PlayerChatEvent(player, sender, message, format)

      Vokkit.getServer().getPluginManager().makeEvent(playerChatEvent)
      if (!playerChatEvent.isCancelled()) {
        player.sendMessage(playerChatEvent.getSender(), playerChatEvent.getMessage(), playerChatEvent.getFormat())
      }
    })
  }

  sendSystemMessage (message) {
    Vokkit.getServer().getSocketServer().emit('broadcast', {
      id: null,
      sender: sender,
      message: message.toString(),
      format: '<%s> %s\n'
    })
  }

  broadcast (sender, message, format) {
    const players = Vokkit.getServer().getPlayers()

    for (const player of players) {
      player.sendMessage(sender, message, format)
    }
  }
}

module.exports = ChatManager
