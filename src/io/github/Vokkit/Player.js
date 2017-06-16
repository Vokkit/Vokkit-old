function Player(name, socket){
    var name = name;
    var socket = socket;
    this.getName = function(){
        return name;
    }
    this.getId = function(){
        return socket.id;
    }
    this.getSocket = function(){
        return socket;
    }
    this.equals = function(object) {
        return object instanceof Player && object.getId() == this.getId();
    }
}

module.exports = Player;