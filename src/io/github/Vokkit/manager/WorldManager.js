var Block = require("../block/Block.js");

function WorldManager() {
    this.getListener = function (socket, listenerName) {
        if (listenerName == "requestWorld") {
            return function () {
                /*var worldList = Vokkit.getServer().getWorlds();
                var worldData = [];
                for (var i in worldList) {
                    worldData.push(worldList[i].toArray());
                }
                console.log(worldData);
                socket.emit("world", worldData);*/
            }
        } else if (listenerName == "requestSetBlock") {
            return function (data) {
                var world = Vokkit.getServer().getWorld(data.worldName);
                world.setBlock(new Block(new THREE.Vector3(data.x, data.y, data.z), data.id));
                Vokkit.getServer().getSocketServer().emit("setBlock", data);
            }
        }
    }

    this.getWorldArray = function () {
        var worldList = Vokkit.getServer().getWorlds();
        var worldData = [];
        for (var i in worldList) {
            worldData.push(worldList[i].toArray());
        }
        return worldData;
    }
}

module.exports = WorldManager;