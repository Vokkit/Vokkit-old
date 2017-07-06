var LoginManager = require("./LoginManager.js");
var MoveManager = require("./MoveManager.js");
var WorldManager = require("./WorldManager.js");
var PlayerSkinManager = require("./PlayerSkinManager.js");
var DisconnectManager = require("./DisconnectManager.js");
var Logger = new (require("../Logger.js"))();

var loginManager;
var moveManager;
var worldManager;
var playerSkinManager;
var disconnectManager;

function SocketManager(){
    this.init = function(){
        loginManager = new LoginManager();
        moveManager = new MoveManager();
        worldManager = new WorldManager();
        playerSkinManager = new PlayerSkinManager();
        playerSkinManager.init();
        disconnectManager = new DisconnectManager();

        Vokkit.getServer().getSocketServer().on("connection", function(socket){
            var player;
            socket.on("login", loginManager.getListener(socket));
            socket.on("requestSkin", playerSkinManager.getListener(socket));
            socket.on("requestMove", moveManager.getListener(socket));
            socket.on("requestWorld", worldManager.getListener(socket));
            socket.on("disconnect", disconnectManager.getListener(socket));
        });
    }
}

module.exports = SocketManager;