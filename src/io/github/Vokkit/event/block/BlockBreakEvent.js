var CancellableBlockEvent = require("./CancellableBlockEvent.js");

class BlockBreakEvent extends CancellableBlockEvent{
    constructor(block, player) {
        super(block);
        this.player = player;
        this.dropItems = false;
        this.eventName = "BlockBreakEvent";
    }

    getPlayer = function() {
        return this.player;
    }

    getBlock = function() {
        return this.block;
    }

    setDropItems = function(dropItems = true) {
        this.dropItems = !!dropItems;
    }

    isDropItems = function() {
        return this.dropItems;
    }
}

module.exports = BlockBreakEvent;