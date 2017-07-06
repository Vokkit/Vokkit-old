var fs = require("fs");
var path = require("path");

var skinList;

function PlayerSkinManager(){
    this.init = function(){
        skinList = fs.readdirSync(path.join(path.resolve(""), "public/assets/skins"));
    }
    this.getListener = function(socket){
        return function(){
            var result = [];
            for (var i in skinList) {
                if (skinList[i].indexOf("#") != -1) {
                    if (skinList[i].split("#")[1] != socket.id) continue;
                }
                result.push(skinList[i]);
            }
            socket.emit("skin", result);
        }
    }
}

module.exports = PlayerSkinManager;