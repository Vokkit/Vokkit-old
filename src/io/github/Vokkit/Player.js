function Player(name, location, velocity, socket){
    this.name = name;
    this.location = location.clone();
    this.velocity = velocity.slice();
    this.socket = socket;
    var player = this;
    this.getName = function(){
        return player.name;
    }
    this.getId = function(){
        return player.socket.id;
    }
    this.getLocation = function(){
        return player.location;
    }
    this.getVelocity = function(){
        return player.velocity.slice();
    }
    this.setVelocity = function(velocity){
        player.velocity = velocity.slice();
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
            location: player.location.toObject(),
            velocity: [0, 0, 0],
            id: player.getId()
        };
    }
}

module.exports = Player;