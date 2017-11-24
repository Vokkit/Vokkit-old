class ChatManager {
  constructor () {
    this.chat = []

    const socket = Vokkit.getClient().getSocket()
    socket.on('chat', data => {
      const message = data.message

      this.chat.push(message)
      Vokkit.getClient().getScreenManager().getScreen('ChatScreen').addChat(message)
    })
  }

  sendChat (message) {
    const socket = Vokkit.getClient().getSocket()

    socket.emit('broadcast', {message})
    this.chat.push(message)
  }

  sendCommand (message) {
    const socket = Vokkit.getClient().getSocket()

    socket.emit('command', {message})
    this.chat.push(message)
  }

  getAllChats () {
    return this.chat
  }
}

module.exports = ChatManager
