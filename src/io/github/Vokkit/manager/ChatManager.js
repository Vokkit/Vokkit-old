const PlayerChatEvent = require('../event/player/PlayerChatEvent')

const SocketManager = require('./SocketManager.js')

class ChatManager extends SocketManager {
  addListener (socket) {
    socket.on('chat', function (data) {
      let player = Vokkit.getServer().getPlayerById(socket.id)
      let sender = data.sender
      let message = data.message
      let format = '<%s> %s\n'
      let playerChatEvent = new PlayerChatEvent(player, sender, message, format)
      Vokkit.getServer().getPluginManager().makeEvent(playerChatEvent)
      if (!playerChatEvent.isCancelled()) {
        player.sendMessage(playerChatEvent.getSender(), playerChatEvent.getMessage(), playerChatEvent.getFormat())
      }
    })
  }

  sendSystemMessage (message) {
    Vokkit.getServer().getSocketServer().emit('chat', {
      id: null,
      sender: 'server',
      message: message.toString(),
      format: '<%s> %s\n'
    })
  }
}

module.exports = ChatManager
