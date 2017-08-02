var PlayerEvent = require("./PlayerEvent.js");

function PlayerQuitEvent(player, quitMessage) {
    PlayerEvent.call(this, player);
    this.quitMessage = quitMessage;
    this.eventName = "PlayerQuitEvent";
}

PlayerQuitEvent.prototype = new PlayerEvent();


PlayerQuitEvent.prototype.getQuitMessage = function () {
    return this.quitMessage;
}
PlayerQuitEvent.prototype.setQuitMessage = function (message) {
    this.quitMessage = message;
}

module.exports = PlayerQuitEvent;