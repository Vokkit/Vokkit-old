var Player = require("./Player.js");
var World = require("./World.js");
var Logger = new (require("./Logger.js"))();

var THREE = require("three");
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require("socket.io");
var socketServer = io.listen(http);
var path = require("path");

function Server(){
    var playerList = [];
    var worldList = [];
    var server = this;
    this.init = function(startTime) {
        Logger.info("월드를 불러오는 중...");
        worldList = World.getAllWorlds();
        Logger.info(worldList.length + "개의 월드를 불러왔습니다.");
        socketServer.on("connection", function(socket){
            var player;
            socket.on("login", function(data){
                for (var i in playerList) {
                    if (playerList[i].getName() == data.name) {
                        socket.emit("loginResult", {
                            succeed: false,
                            reason: 0
                        });
                        return;
                    }
                }
                player = new Player(data.name, socket);
                playerList.push(player);
                socket.emit("loginResult", {
                    succeed: true
                });
                var address = socket.request.connection._peername;
                Logger.info(player.getName() + "[" + address.address + ":" + address.port + "] 이가 로그인 했습니다.");
            });
 
            socket.on("disconnect", function(){
                if (player !== undefined) {
                    for (var i in playerList) {
                        if (playerList[i].equals(player)) {
                            playerList.splice(i, 1);
                            var address = socket.request.connection._peername;
                            Logger.info(player.getName() + "[" + address.address + ":" + address.port + "] 이가 로그아웃 했습니다.");
                            return;
                        }
                    }
                }
            });
        });
        app.use(express.static(path.join(path.resolve(""), "public")));
        http.listen(3000, function(){
            var endTime = new Date().getTime();
            Logger.info("완료 (" + ((endTime - startTime) / 1000) + "초)! 도움말을 보시려면 \"help\" 또는 \"?\" 를 입력해 주세요");
        });
    }
    this.getWorld = function(worldName) {
        for (var i in worldList) {
            if (worldList[i].getWorldName() == worldName) {
                return worldList[i];
            }
        }
        return null;
    }
    this.getWorlds = function(){
        return worldList.slice();
    }
    this.getPlayer = function(name){
        for (var i in playerList) {
            if (playerList[i].getName() == name) {
                return playerList[i];
            }
        }
    }
    this.getOnlinePlayers = function(name){
        return playerList.slice();
    }
}

Server.protocolVersion = 1;
Server.version = "0.0.1";

module.exports = Server;