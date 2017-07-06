var Client = require("./Client.js");
var client;

function Vokkit(){

}

Vokkit.init = function(){
    client = new Client();
    client.loginInit();
}

Vokkit.getClient = function(){
    return client;
}

module.exports = Vokkit;