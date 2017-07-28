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
}

module.exports = PlayerJoinEvent;