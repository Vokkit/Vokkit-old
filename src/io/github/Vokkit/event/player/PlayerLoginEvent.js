var PlayerEvent = require("./PlayerEvent.js");

function PlayerLoginEvent(player, address) {
    PlayerEvent.call(this, player);
    this.cancelled = false;
    this.reason = "";
    this.eventName = "PlayerLoginEvent";
}

PlayerLoginEvent.prototype = new PlayerEvent();


PlayerLoginEvent.prototype.setCancelled = function (cancel) {
    if (cancel == undefined) this.cancelled = true;
    else {
        this.cancelled = !!cancel;
    }
}
PlayerLoginEvent.prototype.isCancelled = function () {
    return this.cancelled;
}
PlayerLoginEvent.prototype.setReason = function (reason) {
    this.reason = reason;
}
PlayerLoginEvent.prototype.getReason = function () {
    return this.reason;
}
PlayerLoginEvent.prototype.getAddress = function () {
    return this.address;
}


module.exports = PlayerLoginEvent;