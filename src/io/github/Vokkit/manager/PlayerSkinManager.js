var fs = require("fs");
var path = require("path");

var SocketManager = require("./SocketManager.js");

class PlayerSkinManager extends SocketManager{
    constructor(){
        super();
        this.skinList = fs.readdirSync(path.join(path.resolve(""), "public/assets/skins"));
    }
    addListener(socket){
        var playerSkinManager = this;
        socket.on("requestSkin", function(){
            var result = [];
            for (var i in playerSkinManager.skinList) {
                if (playerSkinManager.skinList[i].indexOf("#") != -1) {
                    if (playerSkinManager.skinList[i].split("#")[1] != socket.id) continue;
                }
                result.push(playerSkinManager.skinList[i]);
            }
            socket.emit("skin", result);
        });
    }
}

module.exports = PlayerSkinManager;