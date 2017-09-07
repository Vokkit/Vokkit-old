class Entity {
    constructor(id, location, velocity) {
        this.id = id;
        this.location = location == undefined ? undefined : location.clone();
        this.velocity = location == undefined ? undefined : velocity.clone();
    }

    getId() {
        return this.id;
    }

    getLocation() {
        return this.location.clone();
    }

    teleport(loc) {
        this.location.copy(loc);
    }

    getVelocity() {
        return this.velocity.clone();
    }

    setVelocity(velocity) {
        this.velocity.copy(velocity);
    }

    equals(object) {
        return object instanceof this.constructor && object.getId() == this.getId();
    }
}

module.exports = Entity;