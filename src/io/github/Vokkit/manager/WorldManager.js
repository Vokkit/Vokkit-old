function WorldManager() {
    this.getListener = function (socket) {
        return function () {
            var worldList = Vokkit.getServer().getWorlds();
            var worldData = [];
            for (var i in worldList) {
                worldData.push(worldList[i].toArray());
            }
            socket.emit("world", worldData);
        }
    }
}

module.exports = WorldManager;