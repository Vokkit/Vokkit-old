//var Vokkit = require("../Vokkit.js");

var loginButton;
var idText;

function LoginManager(){
    var loginManager = this;
    var socket;
    this.init = function(){
        socket = Vokkit.getClient().getSocket();
        loginButton = document.getElementById("loginButton");
        idText = document.getElementById("idText");
        socket.on("loginResult", function(data){
            if (!data.succeed) {
               alert("로그인 실패! 이유: " + data.reason);
            } else {
                var playerManager = Vokkit.getClient().getPlayerManager();
                for (var i in data.players) {
                    playerManager.addPlayer(data.players[i]);
                }
                loginManager.onLogin();
            }
        });
        loginButton.onclick = function(){
            loginManager.requestLogin(idText.value);
        }
    }
    this.requestLogin = function(id){
        if (id == "") {
            return false;
        }
        socket.emit("login", {
            name: id
        });
    }
}

module.exports = LoginManager;