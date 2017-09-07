var CancellableServerEvent = require("./CancellableServerEvent.js");

class ServerCommandEvent extends CancellableServerEvent{
    constructor(sender, command) {
        super();
        this.sender = sender;
        this.command = command;
        this.eventName = "ServerCommandEvent";
    }

    getCommand(){
        return this.command;
    }

    getSender(){
        return this.sender;
    }

    setCommand(command){
        this.command = command;
    }
}

module.exports = ServerCommandEvent;