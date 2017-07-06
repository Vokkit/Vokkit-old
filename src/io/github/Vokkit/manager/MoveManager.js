function MoveManager() {
    this.getListener = function (socket) {
        return function (data) {
            var player = Vokkit.getServer().getPlayerById(socket.id);
            player.setPosition([data.x, data.y, data.z]);
        }
    }
}

module.exports = MoveManager;