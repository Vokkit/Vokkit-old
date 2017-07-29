var Server;
var Logger;

var server;
function Vokkit() {

}

Vokkit.init = function () {
    try {
        Server = require("./Server.js");
        Logger = new (require("./Logger.js"))();
        var now = new Date().getTime();
        Logger.info("Vokkit v" + Server.version + "이(가) 프로토콜 버전 " + Server.protocolVersion + " 에서 열립니다.");
        server = new Server();
        server.init(now);
    } catch (e) {
        Logger.warn(e);
    }
}

Vokkit.getServer = function () {
    return server;
}

module.exports = Vokkit;
