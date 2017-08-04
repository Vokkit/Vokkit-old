var LoginManager = require("./LoginManager.js");
var MoveManager = require("./MoveManager.js");
var WorldManager = require("./WorldManager.js");
var PlayerSkinManager = require("./PlayerSkinManager.js");
var DisconnectManager = require("./DisconnectManager.js");
var WebVRManager = require("./WebVRManager.js");
var ChatManager = require("./ChatManager.js");
var Logger = new (require("../Logger.js"))();

function SocketManager(){
    this.init = function(){
        this.loginManager = new LoginManager();
        this.moveManager = new MoveManager();
        this.worldManager = new WorldManager();
        this.playerSkinManager = new PlayerSkinManager();
        this.playerSkinManager.init();
        this.disconnectManager = new DisconnectManager();
        this.webVRManager = new WebVRManager();
        this.chatManager = new ChatManager();

        var socketManager = this;

        Vokkit.getServer().getSocketServer().on("connection", function(socket){
            var player;
            socket.on("login", socketManager.loginManager.getListener(socket, "login"));
            socket.on("requestSkin", socketManager.playerSkinManager.getListener(socket, "requestSkin"));
            socket.on("requestMove", socketManager.moveManager.getListener(socket, "requestMove"));
            socket.on("requestWorld", socketManager.worldManager.getListener(socket, "requestWorld"));
            socket.on("requestSetBlock", socketManager.worldManager.getListener(socket, "requestSetBlock"));
            socket.on("disconnect", socketManager.disconnectManager.getListener(socket, "disconnect"));
            socket.on("VRStart", socketManager.webVRManager.getListener(socket, "VRStart"));
            socket.on("VREnd", socketManager.webVRManager.getListener(socket, "VREnd"));
            socket.on("VRRotation", socketManager.webVRManager.getListener(socket, "VRRotation"));
            socket.on("chat", socketManager.chatManager.getListener(socket, "chat"));
        });
    }
}

module.exports = SocketManager;