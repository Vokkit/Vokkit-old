var PlayerMoveEvent = require("../event/player/PlayerMoveEvent.js");

function MoveManager() {
    this.getListener = function (socket) {
        return function (data) {
            var player = Vokkit.getServer().getPlayerById(socket.id);
            var location = player.getLocation();
            var velocity = player.getVelocity();
            location.set(data.x, data.y, data.z);
            location.setYaw(data.yaw);
            location.setPitch(data.pitch);
            var playerMoveEvent = new PlayerMoveEvent(player, player.getLocation(), location);
            Vokkit.getServer().getPluginManager().makeEvent(playerMoveEvent);
            if (playerMoveEvent.isCancelled()) {
                location = player.getLocation();
                socket.emit("move", {
                    id: player.getId(),
                    x: location.getX(),
                    y: location.getY(),
                    z: location.getZ(),
                    yaw: location.getYaw(),
                    pitch: location.getPitch(),
                    velocity: [velocity.x, velocity.y, velocity.z]
                });
                return;
            }
            player.teleport(location);
            Vokkit.getServer().getSocketServer().emit("move", {
                id: player.getId(),
                x: location.getX(),
                y: location.getY(),
                z: location.getZ(),
                yaw: location.getYaw(),
                pitch: location.getPitch(),
                velocity: [velocity.x, velocity.y, velocity.z]
            });
        }
    }
}

module.exports = MoveManager;