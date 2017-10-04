function ChatManager () {
  var chat = []
  this.init = function () {
    var socket = Vokkit.getClient().getSocket()
    socket.on('chat', function (data) {
      var player = Vokkit.getClient().getPlayerById(data.id)
      var sender = data.sender
      var message = data.message
      var format = data.format
      Vokkit.getClient().getUIManager().addChat(sender, message, format)
    })
  }

  this.sendChat = function (sender, message) {
    var socket = Vokkit.getClient().getSocket()
    socket.emit('chat', {
      sender: sender,
      message: message
    })
    chat.push(message)
  }
  this.sendCommand = function (sender, message) {
    var socket = Vokkit.getClient().getSocket()
    socket.emit('command', {
      sender: sender,
      message: message
    })
    chat.push(message)
  }
}

module.exports = ChatManager
