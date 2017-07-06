var Server = require("./Server.js");
var Logger = new (require("./Logger.js"))();

var server;
function Vokkit(){
    
}

Vokkit.init = function(){
    var now = new Date().getTime();
    Logger.info("Vokkit v" + Server.version + "이(가) 프로토콜 버전 " + Server.protocolVersion + " 에서 열립니다.");
    server = new Server();
    server.init(now);
}

Vokkit.getServer = function(){
    return server;
}

module.exports = Vokkit;
