var Vokkit = require("../Vokkit.js");

/**@type {SocketIO.Server} */
var socket = io.connect();
var loginButton;
var idText;

function LoginManager(){
    var loginManager = this;
    this.init = function(){
        loginButton = document.getElementById("loginButton");
        idText = document.getElementById("idText");
        socket.on("loginResult", function(data){
            if (!data.result) {
                if (data.reason == 0) {
                    alert("이름이 중복됩니다.");
                }
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