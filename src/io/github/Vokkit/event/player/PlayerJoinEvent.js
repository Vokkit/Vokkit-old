function PlayerJoinEvent(player, joinMessage) {
    this.getPlayer = function() {
        return player;
    }
    this.getJoinMessage = function(){
        return joinMessage;
    }
    this.setJoinMessage = function(message){
        joinMessage = message;
    }
    this.getName = function() {
        return "PlayerJoinEvent";
    }
}

module.exports = PlayerJoinEvent;