var LoginManager = require("./manager/LoginManager.js");
var MoveManager = require("./manager/MoveManager.js");
var WorldManager = require("./manager/WorldManager.js");
var PlayerManager = require("./manager/PlayerManager.js");
var SceneManager = require("./manager/SceneManager.js");
var InputManager = require("./manager/InputManager.js");
var BlockTextureManager = require("./manager/BlockTextureManager.js");
var WebVRManager = require("./manager/WebVRManager.js");
var UIManager = require("./manager/UIManager.js");
var ChatManager = require("./manager/ChatManager.js");
var PluginManager = require("./plugin/PluginManager.js");

/**@type {SocketIO.Server} */
var socket = io();
var loginManager;
var moveManager;
var worldManager;
var playerManager;
var sceneManager;
var inputManager;
var playerBodyManager;
var blockTextureManager;
var webVRManager;
var uiManager;
var chatMananger;
var pluginManager;

const isDebug = true

function Client(){
    var worldList = [];
    var playerList = [];
    var client = this;
    var logined = false;
    this.loginInit = function(){
        pluginManager = new PluginManager();
        pluginManager.init();
        pluginManager.load();
        loginManager = new LoginManager();
        blockTextureManager = new BlockTextureManager();
        moveManager = new MoveManager();
        worldManager = new WorldManager();
        playerManager = new PlayerManager();
        playerManager.init();
        sceneManager = new SceneManager();
        sceneManager.loginInit();
        inputManager = new InputManager();
        webVRManager = new WebVRManager();
        uiManager = new UIManager();
        chatManager = new ChatManager();
        loginManager.onLogin = function(){
            logined = true;
            client.init();
        }
        loginManager.init();
    }
    this.init = function(){
        moveManager.init();
        blockTextureManager.init();
        webVRManager.init();
        sceneManager.init();
        worldManager.init();
        sceneManager.drawWorld(worldList[0]);
        inputManager.init();
        sceneManager.start();
        uiManager.init();
        chatManager.init();
        pluginManager.enable();
    }
    this.getLoginManager = function(){
        return loginManager;
    }
    this.getMoveManager = function(){
        return moveManager;
    }
    this.getWorldManager = function(){
        return worldManager;
    }
    this.getPlayerManager = function(){
        return playerManager;
    }
    this.getSceneManager = function(){
        return sceneManager;
    }
    this.getInputManager = function(){
        return inputManager;
    }
    this.getBlockTextureManager = function(){
        return blockTextureManager;
    }
    this.getSocket = function(){
        return socket;
    }
    this.getWebVRManager = function() {
        return webVRManager;
    }
    this.getUIManager = function() {
        return uiManager;
    }
    this.getChatManager = function() {
        return chatManager;
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
    this.addWorld = function(world) {
        worldList.push(world);
    }
    this.getPlayers = function(name) {
        var players = [];
        for (var i in playerList) {
            if (playerList[i].getName() == name) {
                players.push(playerList[i]);
            }
        }
        return players;
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
    this.addPlayer = function(player){
        for (var i in playerList) {
            if (playerList[i].getId() == player.getId()) {
                return;
            }
        }
        playerList.push(player);
    }
    this.removePlayer = function(id) {
        for (var i in playerList) {
            if (playerList[i].getId() == id) {
                playerList.splice(i, 1);
                return;
            }
        }
    }
    this.getLocalPlayer = function(){
        for (var i in playerList) {
            if (playerList[i].isLocalPlayer) {
                return playerList[i];
            }
        }
    }
    this.isDebug = function() {
      return isDebug
    }
}

module.exports = Client;
