class ChatManager {
  constructor () {
    this.chat = []

    const socket = Vokkit.getClient().getSocket()
    socket.on('chat', function (data) {
      const sender = data.sender
      const message = data.message
      const format = data.format
      Vokkit.getClient().getUIManager().addChat(sender, message, format)
    })
  }

  sendChat (sender, message) {
    const socket = Vokkit.getClient().getSocket()
    socket.emit('chat', {
      sender: sender,
      message: message
    })
    this.chat.push(message)
  }

  sendCommand (sender, message) {
    const socket = Vokkit.getClient().getSocket()
    socket.emit('command', {
      sender: sender,
      message: message
    })
    this.chat.push(message)
  }
}

module.exports = ChatManager
