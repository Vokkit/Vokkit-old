var LoginManager = require("./socket/LoginManager.js");

/**@type {SocketIO.Server} */
var socket = io();
var loginManager;

function Client(){
    this.init = function(){
        loginManager = new LoginManager();
        loginManager.init();
    }
}

module.exports = Client;