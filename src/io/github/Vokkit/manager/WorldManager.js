var Block = require("../block/Block.js");

var SocketManager = require("./SocketManager.js");

class WorldManager extends SocketManager {
    addListener(socket) {
        socket.on("requestSetBlock", function (data) {
            var world = Vokkit.getServer().getWorld(data.worldName);
            world.setBlock(new Block(new THREE.Vector3(data.x, data.y, data.z), data.id));
            Vokkit.getServer().getSocketServer().emit("setBlock", data);
        });
    }

    getWorldArray() {
        var worldList = Vokkit.getServer().getWorlds();
        var worldData = [];
        for (var i in worldList) {
            worldData.push(worldList[i].toArray());
        }
        return worldData;
    }
}

module.exports = WorldManager;