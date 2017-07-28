function Player(name, location, acceleration, id, isLocalPlayer){
    this.name = name;
    this.location = location.clone();
    this.acceleration = acceleration.clone();
    this.id = id;
    this.isLocalPlayer = isLocalPlayer;
    var player = this;
    this.getName = function(){
        return player.name;
    }
    this.getId = function(){
        return player.id;
    }
    this.getLocation = function(){
        return player.location;
    }
    this.getEyeLocation = function(){
        
    }
    this.getAcceleration = function(){
        return player.acceleration.clone();
    }
    this.setAcceleration = function(acceleration){
        player.acceleration.copy(acceleration);
    }
    this.addAcceleration = function(acceleration){
        player.acceleration.add(acceleration);
    }
    this.equals = function(object) {
        return object instanceof Player && object.getId() == player.getId();
    }
}

module.exports = Player;