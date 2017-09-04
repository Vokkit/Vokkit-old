var Player;
var World;
var Logger;
var SocketManager;
var PluginManager;

var express;
var app;
var http;
var io;
var socketServer;
var path;

var socketManager;

function Server() {
    var playerList = [];
    var worldList = [];
    var server = this;

    Player = require("./entity/Player.js");
    World = require("./World.js");
    Logger = new (require("./Logger.js"))();
    SocketManager = require("./manager/SocketManager.js");
    PluginManager = require("./plugin/PluginManager.js");

    express = require('express');
    io = require("socket.io");
    path = require("path");

    this.init = function (startTime) {
        process.on('uncaughtException', function (err) {
            Logger.warn(err.stack);
        });
        app = express();
        http = require('http').Server(app);
        socketServer = io.listen(http);

        Logger.info("월드를 불러오는 중...");
        worldList = World.getAllWorlds();
        Logger.info(worldList.length + "개의 월드를 불러왔습니다.");

        Logger.info("통신 기능을 불러오는 중...");
        socketManager = new SocketManager();
        socketManager.init();
        Logger.info("통신 기능을 불러왔습니다.");

        pluginManager = new PluginManager();
        pluginManager.init();
        pluginManager.loadPlugins();
        pluginManager.enablePlugins();

        

        Logger.info("서버를 여는 중...");
        app.use(express.static(path.join(path.resolve(""), "public")));
        http.listen(3000, function () {
            var endTime = new Date().getTime();
            Logger.info("완료 (" + ((endTime - startTime) / 1000) + "초)! 도움말을 보시려면 \"help\" 또는 \"?\" 를 입력해 주세요");
        });
    }
    this.getWorld = function (worldName) {
        for (var i in worldList) {
            if (worldList[i].getWorldName() == worldName) {
                return worldList[i];
            }
        }
        return null;
    }
    this.getWorlds = function () {
        return worldList.slice();
    }
    this.getPlayer = function (name) {
        for (var i in playerList) {
            if (playerList[i].getName() == name) {
                return playerList[i];
            }
        }
    }
    this.addPlayer = function (player) {
        for (var i in playerList) {
            if (playerList[i].getId() == player.getId()) {
                return;
            }
        }
        playerList.push(player);
    }
    this.removePlayer = function (player) {
        for (var i in playerList) {
            if (playerList[i].getId() == player.getId()) {
                playerList.splice(i, 1);
                return;
            }
        }
    }
    this.getPlayerById = function (id) {
        for (var i in playerList) {
            if (playerList[i].getId() == id) {
                return playerList[i];
            }
        }
    }
    this.getPlayers = function(name) {
        var result = [];
        for (var i in playerList) {
            if (playerList[i].getName() == name) {
                result.push(playerList[i]);
            }
        }
        return result;
    }
    this.getOnlinePlayers = function (name) {
        return playerList.slice();
    }
    this.getSocketServer = function () {
        return socketServer;
    }
    this.getDisconnectManager = function () {
        return socketManager.disconnectManager;
    }
    this.getLoginManager = function () {
        return socketManager.loginManager;
    }
    this.getMoveManager = function () {
        return socketManager.moveManager;
    }
    this.getPlayerSkinManager = function () {
        return socketManager.playerSkinManager;
    }
    this.getSocketManager = function () {
        return socketManager;
    }
    this.getWorldManager = function () {
        return socketManager.worldManager;
    }
    this.getPluginManager = function () {
        return pluginManager;
    }
    this.getLogger = function () {
        return Logger;
    }
}

Server.protocolVersion = 1;
Server.version = "0.0.1";

module.exports = Server;