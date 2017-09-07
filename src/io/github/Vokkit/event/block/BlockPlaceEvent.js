var CancellableBlockEvent = require("./CancellableBlockEvent.js");

class BlockPlaceEvent extends CancellableBlockEvent{
    constructor(placedBlock, placedAgainst, itemInHand, player) {
        super(placedBlock);
        this.placedAgainst = placedAgainst;
        this.itemInHand = itemInHand;
        this.player = player;
        this.eventName = "BlockPlaceEvent";
    }

    getPlayer() {
        return this.player;
    }

    getBlockAgainst() {
        return this.placedAgainst;
    }

    getItemInHand() {
        return this.itemInHand;
    }
}

module.exports = BlockPlaceEvent;