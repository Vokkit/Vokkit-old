function BlockBreakEvent(block, player) {
    var cancelled = false;
    var dropItems = false;

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
        return block;
    }

    this.setDropItems = function(d) {
        if (d == undefined) dropItems = true;
        else {
            dropItems = !!d;
        }
    }

    this.isDropItems = function() {
        return dropItems;
    }

    this.getName = function() {
        return "BlockBreakEvent";
    }
}

module.exports = BlockBreakEvent;