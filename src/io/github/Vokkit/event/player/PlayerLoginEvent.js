function PlayerLoginEvent(player, address) {
    var cancelled = false;
    var reason = "";
    this.setCancelled = function(cancel) {
        if (cancel == undefined) cancelled = true;
        else {
            cancelled = !!cancel;
        }
    }
    this.isCancelled = function() {
        return cancelled;
    }
    this.getPlayer = function() {
        return player;
    }
    this.setReason = function(reason2) {
        reason = reason2;
    }
    this.getReason = function() {
        return reason;
    }
    this.getAddress = function() {
        return address;
    }
    this.getName = function() {
        return "PlayerLoginEvent";
    }
}

module.exports = PlayerLoginEvent;