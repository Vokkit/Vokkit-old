var PlayerEvent = require("./PlayerEvent.js");

function PlayerChatEvent(player, sender, message, format) {
    PlayerEvent.call(this, player);
    this.sender = sender;
    this.message = message;
    this.format = format;
    this.cancelled = false;
    this.eventName = "PlayerChatEvent";
}

PlayerChatEvent.prototype = new PlayerEvent();


PlayerChatEvent.prototype.setCancelled = function (cancel) {
    if (cancel == undefined) this.cancelled = true;
    else {
        this.cancelled = !!cancel;
    }
}
PlayerChatEvent.prototype.isCancelled = function () {
    return this.cancelled;
}
PlayerChatEvent.prototype.getSender = function() {
    return this.sender;
}
PlayerChatEvent.prototype.setSender = function(sender) {
    this.sender = sender;
}
PlayerChatEvent.prototype.getMessage = function() {
    return this.message;
}
PlayerChatEvent.prototype.setMessage = function(message) {
    this.message = message;
}
PlayerChatEvent.prototype.getFormat = function() {
    return this.format;
}
PlayerChatEvent.prototype.setFormat = function(format) {
    this.format = format;
}

PlayerChatEvent.prototype.constructor = PlayerChatEvent;

module.exports = PlayerChatEvent;