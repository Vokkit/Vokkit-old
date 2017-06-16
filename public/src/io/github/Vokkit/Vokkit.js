var Client = require("./Client.js");
var client;

function Vokkit(){

}

Vokkit.init = function(){
    client = new Client();
    client.init();
}

Vokkit.getClient = function(){
    return client;
}

module.exports = Vokkit;