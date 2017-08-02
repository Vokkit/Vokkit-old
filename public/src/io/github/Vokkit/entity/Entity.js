function Entity(id, location, velocity) {
    this.id = id;
    this.location = location == undefined ? undefined : location.clone();
    this.velocity = location == undefined ? undefined : velocity.clone();
}

Entity.prototype.getId = function () {
    return this.id;
}

Entity.prototype.getLocation = function () {
    return this.location.clone();
}

Entity.prototype.teleport = function (loc) {
    this.location.copy(loc);
    if (this.body != undefined) this.body.updatePosition(this.location, this.velocity);
}

Entity.prototype.getVelocity = function () {
    return this.velocity.clone();
}

Entity.prototype.setVelocity = function (velocity) {
    this.velocity.copy(velocity);
}

Entity.prototype.equals = function (object) {
    return object instanceof this.constructor && object.getId() == this.getId();
}

Entity.prototype.constructor = Entity;

module.exports = Entity;