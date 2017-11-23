class ChatManager {
  constructor () {
    this.chat = []

    const socket = Vokkit.getClient().getSocket()
    socket.on('chat', data => {
      const sender = data.sender
      const message = data.message
      const format = data.format

      this.chat.push(data)
      Vokkit.getClient().getScreenManager().getScreen('ChatScreen').addChat(sender, message, format)
    })
  }

  sendChat (sender, message) {
    const socket = Vokkit.getClient().getSocket()
    const object = {
      sender: sender,
      message: message,
      format: '<%s> %s\n'
    }

    socket.emit('broadcast', object)
    this.chat.push(object)
  }

  sendCommand (sender, message) {
    const socket = Vokkit.getClient().getSocket()
    const object = {
      sender: sender,
      message: message,
      format: '<%s> %s\n'
    }

    socket.emit('command', object)
    this.chat.push(object)
  }

  getAllChats () {
    return this.chat
  }
}

module.exports = ChatManager
