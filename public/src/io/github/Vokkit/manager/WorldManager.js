var World = require("../World.js");
var Block = require("../block/Block.js");

function WorldManager(){
    var socket;
    this.init = function(){
        socket = Vokkit.getClient().getSocket();
        socket.on("setBlock", function(data) {
            console.log(data);
            var world = Vokkit.getClient().getWorld(data.worldName);
            world.setBlock(new Block(new THREE.Vector3(data.x, data.y, data.z), data.id));
        })
    }
}

module.exports = WorldManager;