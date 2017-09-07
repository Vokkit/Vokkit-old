var Entity = require("./Entity.js");

class Player extends Entity {
    constructor(id, location, velocity, name, socket, type) {
        super(id, location, velocity);
        this.name = name;
        this.socket = socket;
        this.type = type;
    }

    getName() {
        return this.name;
    }
    
    getSocket() {
        return this.socket;
    }
    
    getType() {
        return this.type;
    }
    
    setType(type) {
        this.type = type;
    }
    
    setVRMode(vrmode) {
        this.VRMode = !!vrmode;
    }
    
    isVRMode() {
        return this.VRMode;
    }
    
    sendMessage(sender, message, format = "<%s> %s\n") {
        this.getSocket().emit("chat", {
            id: this.getId(),
            sender: sender,
            message: message.toString(),
            format: format
        });
    }
    
    toObject() {
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
}

module.exports = Player;