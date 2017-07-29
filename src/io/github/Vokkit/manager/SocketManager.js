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
            socket.on("login", socketManager.loginManager.getListener(socket, "login"));
            socket.on("requestSkin", socketManager.playerSkinManager.getListener(socket, "requestSkin"));
            socket.on("requestMove", socketManager.moveManager.getListener(socket, "requestMove"));
            socket.on("requestWorld", socketManager.worldManager.getListener(socket, "requestWorld"));
            socket.on("requestSetBlock", socketManager.worldManager.getListener(socket, "requestSetBlock"));
            socket.on("disconnect", socketManager.disconnectManager.getListener(socket, "disconnect"));
        });
    }
}

module.exports = SocketManager;