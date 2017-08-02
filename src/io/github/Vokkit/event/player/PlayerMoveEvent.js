var PlayerEvent = require("./PlayerEvent.js");

function PlayerMoveEvent(player, from, to) {
    PlayerEvent.call(this, player);
    this.from = from;
    this.to = to;
    this.cancelled = false;
    this.eventName = "PlayerMoveEvent";
}

PlayerMoveEvent.prototype = new PlayerEvent();


PlayerMoveEvent.prototype.setCancelled = function (cancel) {
    if (cancel == undefined) this.cancelled = true;
    else {
        this.cancelled = !!cancel;
    }
}

PlayerMoveEvent.prototype.isCancelled = function () {
    return this.cancelled;
}

PlayerMoveEvent.prototype.getFrom = function () {
    return this.from;
}

PlayerMoveEvent.prototype.setFrom = function (from) {
    this.from = from;
}

PlayerMoveEvent.prototype.getTo = function () {
    return this.to;
}

PlayerMoveEvent.prototype.setTo = function (to) {
    this.to = to;
}

module.exports = PlayerMoveEvent;