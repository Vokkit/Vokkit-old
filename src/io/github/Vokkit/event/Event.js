function Event() {
    
}

Event.prototype.getEventName = function() {
    return this.eventName;
}

Event.prototype.constructor = Event;

module.exports = Event;