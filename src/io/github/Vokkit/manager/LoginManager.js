var Player = require("../entity/Player.js");
var Location = require("../Location.js");

var PlayerLoginEvent = require("../event/player/PlayerLoginEvent.js");
var PlayerJoinEvent = require("../event/player/PlayerJoinEvent.js");

var SocketManager = require("./SocketManager.js");

class LoginManager extends SocketManager{
    addListener(socket) {
        socket.on("login", function (data) {
            var player = new Player(socket.id, new Location(Vokkit.getServer().getWorlds()[0], 0, 0, 0, 0, 0), new THREE.Vector3(0, 0, 0), data.name, socket, data.type);
            var address = socket.request.connection._peername;
            var playerLoginEvent = new PlayerLoginEvent(player, address.address);
            Vokkit.getServer().getPluginManager().makeEvent(playerLoginEvent);
            if (playerLoginEvent.isCancelled()) {
                socket.emit("loginResult", {
                    succeed: false,
                    reason: playerLoginEvent.getReason()
                });
                return;
            }
            var playerList = Vokkit.getServer().getOnlinePlayers();
            for (var i in playerList) {
                if (playerList[i].getName() == data.name && playerList[i].getType() == data.type) {
                    socket.emit("loginResult", {
                        succeed: false,
                        reason: "이름이 중복됩니다."
                    });
                    return;
                }
            }
            var sendPlayers = [];
            for (var i in playerList) {
                sendPlayers.push(playerList[i].toObject());
            }
            sendPlayers.push(player.toObject());
            socket.emit("loginResult", {
                succeed: true,
                players: sendPlayers,
                worlds: Vokkit.getServer().getWorldManager().getWorldArray()
            });
            Vokkit.getServer().addPlayer(player);
            Vokkit.getServer().getLogger().info(player.getName() + "[" + address.address + ":" + address.port + ", type: " + data.type + "] 이가 로그인 했습니다.");
            var playerJoinEvent = new PlayerJoinEvent(player);
            Vokkit.getServer().getPluginManager().makeEvent(playerJoinEvent);
            Vokkit.getServer().getSocketServer().emit("playerJoin", player.toObject());
        });
    }
}

module.exports = LoginManager;