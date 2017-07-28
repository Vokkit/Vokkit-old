function PlayerQuitEvent(player, quitMessage) {
    this.getPlayer = function() {
        return player;
    }
    this.getQuitMessage = function(){
        return quitMessage;
    }
    this.setQuitMessage = function(message){
        quitMessage = message;
    }
}

module.exports = PlayerQuitEvent;