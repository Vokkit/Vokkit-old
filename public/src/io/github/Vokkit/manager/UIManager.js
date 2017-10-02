function UIManager() {
    this.init = function () {
        var type = Vokkit.getClient().getLocalPlayer().getType();
        if (type == "Mobile") {
            document.getElementById("LeftButton").style.display = "block";
            document.getElementById("RightButton").style.display = "block";
            document.getElementById("ShiftButton").style.display = "block";
            document.getElementById("FrontButton").style.display = "block";
            document.getElementById("BackButton").style.display = "block";
            document.getElementById("JumpButton").style.display = "block";
        }
        document.getElementById("login").style.display = 'none';
        document.getElementById("cross").style.display = 'block';
    }

    this.toggleChat = function(display) {
        if (this.isChatting()) document.getElementById("chatWindow").style.display = "none";
        else document.getElementById("chatWindow").style.display = "block";
    }

    this.isChatting = function() {
        return document.getElementById("chatWindow").style.display == "block";
    }
    
    this.addChat = function(sender, message, format) {
        var chatLog = document.getElementById("chatLog");
        chatLog.innerText += format.replace("%s", sender).replace("%s", message);
    }

    this.clearChat = function() {
        var chatLog = document.getElementById("chatLog");
        chatLog.innerText = "";
    }
}

module.exports = UIManager;