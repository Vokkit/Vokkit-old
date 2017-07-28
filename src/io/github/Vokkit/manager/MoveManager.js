var PlayerMoveEvent = require("../event/player/PlayerMoveEvent.js");

function MoveManager() {
    this.getListener = function (socket) {
        return function (data) {
            var player = Vokkit.getServer().getPlayerById(socket.id);
            player.getLocation().setX(data.x);
            player.getLocation().setY(data.y);
            player.getLocation().setZ(data.z);
        }
    }
}

module.exports = MoveManager;