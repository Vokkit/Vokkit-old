var Entity = require("./Entity.js");

function Player(id, location, velocity, name, socket, type) {
    Entity.call(this, id, location, velocity);
    this.name = name;
    this.socket = socket;
    this.type = type;
}

Player.prototype = new Entity(); //Player extends Entity

Player.prototype.getName = function () {
    return this.name;
}

Player.prototype.getSocket = function () {
    return this.socket;
}

Player.prototype.getType = function() {
    return this.type;
}

Player.prototype.setType = function(type) {
    this.type = type;
}

Player.prototype.toObject = function () {
    return {
        name: this.name,
        x: this.location.x,
        y: this.location.y,
        z: this.location.z,
        yaw: this.location.yaw,
        pitch: this.location.pitch,
        velocity: [this.velocity.x, this.velocity.y, this.velocity.z],
        id: this.id,
        worldName: this.location.world.getWorldName(),
        type: this.type
    };
}

Player.prototype.constructor = Player;

module.exports = Player;