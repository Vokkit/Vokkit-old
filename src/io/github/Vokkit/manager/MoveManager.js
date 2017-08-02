var PlayerMoveEvent = require("../event/player/PlayerMoveEvent.js");

function MoveManager() {
    this.getListener = function (socket) {
        return function (data) {
            var player = Vokkit.getServer().getPlayerById(socket.id);
            var location = player.getLocation();
            location.set(data.x, data.y, data.z);
            location.setYaw(data.yaw);
            location.setPitch(data.pitch);
            var velocity = new THREE.Vector3(data.velocity[0], data.velocity[1], data.velocity[2]);
            player.setVelocity(velocity);
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
            var players = [player];
            if (player.getType() == "PC") {
                //Mobile도 함께 이동시킨다.
                var players = Vokkit.getServer().getPlayers(player.getName());
            }
            for (var i in players) {
                players[i].teleport(location);
                if (players[i].getId() != player.getId())
                Vokkit.getServer().getSocketServer().emit("move", {
                    id: players[i].getId(),
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
}

module.exports = MoveManager;