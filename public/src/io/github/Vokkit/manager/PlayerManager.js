var Player = require("../entity/Player.js");
var Location = require("../Location.js")

function PlayerManager(){
    var socket;
    var playerManager = this;
    this.init = function(playerList){
        socket = Vokkit.getClient().getSocket();
        socket.on("playerJoin", playerManager.addPlayer);
        socket.on("playerQuit", playerManager.removePlayer);
    }
    this.addPlayer = function(data, ignoreLocal) {
        if (Vokkit.getClient().getLoginManager().isLogined() && (ignoreLocal || !(socket.id == data.id))) Vokkit.getClient().addPlayer(new Player(data.id, new Location(Vokkit.getClient().getWorld(data.worldName), data.x, data.y, data.z, data.yaw, data.pitch), new THREE.Vector3(data.velocity[0], data.velocity[1], data.velocity[2]), data.name, socket.id == data.id, data.type));
    }
    this.removePlayer = function(data) {
        if (Vokkit.getClient().getLoginManager().isLogined()) Vokkit.getClient().removePlayer(data.id);
    }
}

module.exports = PlayerManager;