var PlayerChatEvent = require("../event/player/PlayerChatEvent");

var SocketManager = require("./SocketManager.js");

class ChatManager extends SocketManager{
    addListener(socket){
        socket.on("chat", function (data) {
            var player = Vokkit.getServer().getPlayerById(socket.id);
            var sender = data.sender;
            var message = data.message;
            var format = "<%s> %s\n";
            var playerChatEvent = new PlayerChatEvent(player, sender, message, format);
            Vokkit.getServer().getPluginManager().makeEvent(playerChatEvent);
            if (!playerChatEvent.isCancelled()) {
                chatManager.sendMessage(socket.id, playerChatEvent.getSender(), playerChatEvent.getMessage(), playerChatEvent.getFormat());
            }
        });
    }
}

module.exports = ChatManager;