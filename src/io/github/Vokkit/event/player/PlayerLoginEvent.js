function PlayerLoginEvent(player) {
    this.cancelled = false;
    this.reason = "";
    var playerLoginEvent = this;
    this.setCancelled = function(cancel) {
        if (cancel == undefined) playerLoginEvent.cancelled = true;
        else {
            playerLoginEvent.cancelled = !!cancel;
        }
    }
    this.isCancelled = function() {
        return playerLoginEvent.cancelled;
    }
    this.getPlayer = function() {
        return player;
    }
    this.setReason = function(reason) {
        playerLoginEvent.reason = reason;
    }
    this.getReason = function() {
        return playerLoginEvent.reason;
    }
    this.getName = function() {
        return "PlayerLoginEvent";
    }
}

module.exports = PlayerLoginEvent;