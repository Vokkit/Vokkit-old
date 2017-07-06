function Player(name, position, acceleration, yaw, pitch, id, isLocalPlayer){
    this.name = name;
    this.position = position.clone();
    this.acceleration = acceleration.clone();
    this.yaw = yaw;
    this.pitch = pitch;
    this.id = id;
    this.isLocalPlayer = isLocalPlayer;
    var player = this;
    this.getName = function(){
        return player.name;
    }
    this.getId = function(){
        return player.id;
    }
    this.getPosition = function(){
        return player.position.clone();
    }
    this.getEyeLocation = function(){
        
    }
    this.setPosition = function(position){
        player.position.copy(position);
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
    this.getYaw = function(){
        return player.yaw;
    }
    this.setYaw = function(yaw) {
        player.yaw = yaw;
    }
    this.getPitch = function(){
        return player.pitch;
    }
    this.setPitch = function(pitch) {
        player.pitch = pitch;
    }
    this.equals = function(object) {
        return object instanceof Player && object.getId() == player.getId();
    }
}

module.exports = Player;