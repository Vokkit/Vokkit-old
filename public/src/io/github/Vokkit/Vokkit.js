var Client = require("./Client.js");
var client;

function Vokkit(){

}

Vokkit.init = function(plugins){
    client = new Client(plugins);
    client.loginInit();
}

Vokkit.getClient = function(){
    return client;
}

module.exports = Vokkit;