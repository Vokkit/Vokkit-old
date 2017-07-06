var Player = require("./Player.js");
var World = require("./World.js");
var Logger = new (require("./Logger.js"))();
var SocketManager = require("./manager/SocketManager.js");

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require("socket.io");
var socketServer = io.listen(http);
var path = require("path");

var socketManager;

function Server(){
    var playerList = [];
    var worldList = [];
    var server = this;
    this.init = function(startTime) {
        Logger.info("월드를 불러오는 중...");
        worldList = World.getAllWorlds();
        Logger.info(worldList.length + "개의 월드를 불러왔습니다.");

        Logger.info("통신 기능을 불러오는 중...");
        socketManager = new SocketManager();
        socketManager.init();
        Logger.info("통신 기능을 불러왔습니다.");
        
        Logger.info("서버를 여는 중...");
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
    this.addPlayer = function(player){
        for (var i in playerList) {
            if (playerList[i].getId() == player.getId()) {
                return;
            }
        }
        playerList.push(player);
    }
    this.removePlayer = function(player){
        for (var i in playerList) {
            if (playerList[i].getId() == player.getId()) {
                playerList.splice(i, 1);
                return;
            }
        }
    }
    this.getPlayerById = function(id) {
        for (var i in playerList) {
            if (playerList[i].getId() == id) {
                return playerList[i];
            }
        }
    }
    this.getOnlinePlayers = function(name){
        return playerList.slice();
    }
    this.getSocketServer = function(){
        return socketServer;
    }
}

Server.protocolVersion = 1;
Server.version = "0.0.1";

module.exports = Server;