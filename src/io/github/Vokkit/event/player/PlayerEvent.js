var Event = require("../Event.js");

function PlayerEvent(player) {
    Event.call(this);
    this.player = player;
}

PlayerEvent.prototype = new Event();

PlayerEvent.prototype.getPlayer = function() {
    return this.player;
}

PlayerEvent.prototype.constructor = PlayerEvent;

module.exports = PlayerEvent;