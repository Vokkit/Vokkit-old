function BlockPlaceEvent(placedBlock, placedAgainst, itemInHand, player) {
    var cancelled = false;

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

    this.getBlock = function() {
        return placedBlock;
    }

    this.getBlockAgainst = function() {
        return placedAgainst;
    }

    this.getItemInHand = function() {
        return itemInHand;
    }

    this.getName = function() {
        return "BlockBreakEvent";
    }
}

module.exports = BlockPlaceEvent;