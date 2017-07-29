function Player(name, location, velocity, socket){
    this.name = name;
    this.location = location.clone();
    this.velocity = velocity.clone();
    this.socket = socket;
    var player = this;
    this.getName = function(){
        return player.name;
    }
    this.getId = function(){
        return player.socket.id;
    }
    this.getLocation = function(){
        return player.location.clone();
    }
    this.teleport = function(loc) {
        player.location.copy(loc);
    }
    this.getVelocity = function(){
        return player.velocity.clone();
    }
    this.setVelocity = function(velocity){
        player.velocity.copy(velocity);
    }
    this.getSocket = function(){
        return player.socket;
    }
    this.equals = function(object) {
        return object instanceof Player && object.getId() == player.getId();
    }
    this.toObject = function(){
        return {
            name: player.getName(),
            x: player.location.x,
            y: player.location.y,
            z: player.location.z,
            yaw: player.location.yaw,
            pitch: player.location.pitch,
            velocity: [0, 0, 0],
            id: player.getId()
        };
    }
}

module.exports = Player;