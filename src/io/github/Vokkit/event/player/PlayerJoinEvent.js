var PlayerEvent = require("./PlayerEvent.js");

function PlayerJoinEvent(player, joinMessage) {
    PlayerEvent.call(this, player);
    this.joinMessage = joinMessage;
    this.eventName = "PlayerJoinEvent";
}

PlayerJoinEvent.prototype = new PlayerEvent();


PlayerJoinEvent.prototype.getJoinMessage = function () {
    return this.joinMessage;
}
PlayerJoinEvent.prototype.setJoinMessage = function (message) {
    this.joinMessage = message;
}


module.exports = PlayerJoinEvent;