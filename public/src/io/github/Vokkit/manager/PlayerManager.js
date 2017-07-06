var Player = require("../Player.js");

function PlayerManager(){
    var socket;
    var playerManager = this;
    this.init = function(playerList){
        socket = Vokkit.getClient().getSocket();
        socket.on("playerJoin", playerManager.addPlayer);
        socket.on("playerQuit", playerManager.removePlayer);
    }
    this.addPlayer = function(data) {
        if (socket.id == data.id) {
            Vokkit.getClient().addPlayer(new Player(data.name, new THREE.Vector3(data.position[0], data.position[1], data.position[2]), new THREE.Vector3(data.acceleration[0], data.acceleration[1], data.acceleration[2]), data.yaw, data.pitch, data.id, true));
        } else {
            Vokkit.getClient().addPlayer(new Player(data.name, new THREE.Vector3(data.position[0], data.position[1], data.position[2]), new THREE.Vector3(data.acceleration[0], data.acceleration[1], data.acceleration[2]), data.yaw, data.pitch, data.id, false));
        }
    }
    this.removePlayer = function(data) {
        Vokkit.getClient().removePlayer(data.id);
    }
}

module.exports = PlayerManager;