class SocketManager{

    init(){
        var LoginManager = require("./LoginManager.js");
        var MoveManager = require("./MoveManager.js");
        var WorldManager = require("./WorldManager.js");
        var PlayerSkinManager = require("./PlayerSkinManager.js");
        var DisconnectManager = require("./DisconnectManager.js");
        //var WebVRManager = require("./WebVRManager.js");
        var ChatManager = require("./ChatManager.js");
        var CommandManager = require('./CommandManager.js')

        this.loginManager = new LoginManager();
        this.moveManager = new MoveManager();
        this.worldManager = new WorldManager();
        this.playerSkinManager = new PlayerSkinManager();
        this.disconnectManager = new DisconnectManager();
        //this.webVRManager = new WebVRManager();
        this.chatManager = new ChatManager();
        this.commandManager = new CommandManager()

        var socketManager = this;

        Vokkit.getServer().getSocketServer().on("connection", function(socket){
            socketManager.loginManager.addListener(socket);
            socketManager.moveManager.addListener(socket);
            socketManager.worldManager.addListener(socket);
            socketManager.playerSkinManager.addListener(socket);
            socketManager.disconnectManager.addListener(socket);
            //socketManager.webVRManager.addListener(socket);
            socketManager.chatManager.addListener(socket);
            socketManager.commandManager.addListener(socket)
        });
    }

    addListener(socket){

    }
}

module.exports = SocketManager;
