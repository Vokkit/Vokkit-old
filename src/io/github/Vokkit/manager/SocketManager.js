var LoginManager = require("./LoginManager.js");
var MoveManager = require("./MoveManager.js");
var WorldManager = require("./WorldManager.js");
var PlayerSkinManager = require("./PlayerSkinManager.js");
var DisconnectManager = require("./DisconnectManager.js");
var Logger = new (require("../Logger.js"))();

function SocketManager(){
    this.init = function(){
        this.loginManager = new LoginManager();
        this.moveManager = new MoveManager();
        this.worldManager = new WorldManager();
        this.playerSkinManager = new PlayerSkinManager();
        this.playerSkinManager.init();
        this.disconnectManager = new DisconnectManager();

        var socketManager = this;

        Vokkit.getServer().getSocketServer().on("connection", function(socket){
            var player;
            socket.on("login", socketManager.loginManager.getListener(socket));
            socket.on("requestSkin", socketManager.playerSkinManager.getListener(socket));
            socket.on("requestMove", socketManager.moveManager.getListener(socket));
            socket.on("requestWorld", socketManager.worldManager.getListener(socket));
            socket.on("disconnect", socketManager.disconnectManager.getListener(socket));
        });
    }
}

module.exports = SocketManager;