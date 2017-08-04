function WebVRManager() {
    this.getListener = function (socket, listenerName) {
        if (listenerName == "VRStart") {
            return function () {
                var player = Vokkit.getServer().getPlayerById(socket.id);
                player.setVRMode(true);
                if (player.getType() == "Mobile") {
                    var players = Vokkit.getServer().getPlayers(player.getName());
                    if (players.length == 2) {
                        for (var i in players) {
                            if (players[i].equals(player)) continue;
                            players[i].getSocket().emit("VRStart");
                        }
                    }
                }
            }
        } else if (listenerName == "VREnd") {
            return function () {
                var player = Vokkit.getServer().getPlayerById(socket.id);
                player.setVRMode(true);
                if (player.getType() == "Mobile") {
                    var players = Vokkit.getServer().getPlayers(player.getName());
                    if (players.length == 2) {
                        for (var i in players) {
                            if (players[i].equals(player)) continue;
                            players[i].getSocket().emit("VREnd");
                        }
                    }
                }
            }
        } else if (listenerName == "VRRotation") {
            return function (data) {
                var player = Vokkit.getServer().getPlayerById(socket.id);
                if (player.getType() == "Mobile") {
                    var players = Vokkit.getServer().getPlayers(player.getName());
                    if (players.length == 2) {
                        for (var i in players) {
                            if (players[i].equals(player)) continue;
                            players[i].getSocket().emit("VRRotation", data);
                        }
                    }
                }
            }
        }
    }
}

module.exports = WebVRManager;