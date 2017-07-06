var World = require("../World.js");

function WorldManager(){
    var socket;
    this.init = function(afterdo){
        socket = Vokkit.getClient().getSocket();
        socket.on("world", function(data){
            World.prepareWorlds(data);
            afterdo();
        });
    }
    this.requestWorld = function(player, position){
        socket.emit("requestWorld");
    }
}

module.exports = WorldManager;