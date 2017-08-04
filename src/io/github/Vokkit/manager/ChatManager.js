var PlayerChatEvent = require("../event/player/PlayerChatEvent");

function ChatManager() {
    var chat = [];
    this.getListener = function (socket, listenerName) {
        var chatManager = this;
        if (listenerName == "chat") {
            return function (data) {
                var player = Vokkit.getServer().getPlayerById(socket.id);
                var sender = data.sender;
                var message = data.message;
                var format = "<%s> %s\n";
                var playerChatEvent = new PlayerChatEvent(player, sender, message, format);
                Vokkit.getServer().getPluginManager().makeEvent(playerChatEvent);
                if (!playerChatEvent.isCancelled()) {
                    chatManager.sendMessage(socket.id, playerChatEvent.getSender(), playerChatEvent.getMessage(), playerChatEvent.getFormat());
                }
            }
        }
    }

    this.sendMessage = function (id, sender, message, format) {
        Vokkit.getServer().getSocketServer().emit("chat", {
            id: id,
            sender: sender,
            message: message,
            format: format
        });
    }
}

module.exports = ChatManager;