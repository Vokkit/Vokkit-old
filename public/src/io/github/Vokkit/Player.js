function Player(name, location, velocity, id, isLocalPlayer){
    this.name = name;
    this.location = location.clone();
    this.velocity = velocity.clone();
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
        return player.location.clone();
    }
    this.teleport = function(loc) {
        player.location.copy(loc);
    }
    this.getEyeLocation = function(){
        
    }
    this.getVelocity = function(){
        return player.velocity.clone();
    }
    this.setVelocity = function(velocity){
        player.velocity.copy(velocity);
    }
    this.addVelocity = function(velocity){
        player.velocity.add(velocity);
    }
    this.equals = function(object) {
        return object instanceof Player && object.getId() == player.getId();
    }
}

module.exports = Player;