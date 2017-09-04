var caller = require("caller-id");

function Logger(){
    var getTime = function(){
        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        return hour + ":" + min + ":" + sec;
    }
    this.info = function(message) {
        var path = caller.getData().filePath;
        if (path.indexOf("Vokkit\\plugins\\") != -1) {
            var pluginName = path.split("Vokkit\\plugins\\")[1].split("\\")[0];
            console.log("\x1b[1m\x1b[36m" + getTime() + "\x1b[37m [INFO] [" + pluginName + "] " + message + "\x1b[0m");
        }
        console.log("\x1b[1m\x1b[36m" + getTime() + "\x1b[37m [INFO] " + message + "\x1b[0m");
    }

    this.warn = function(message) {
        var path = caller.getData().filePath;
        if (path.indexOf("Vokkit\\plugins\\") != -1) {
            var pluginName = path.split("Vokkit\\plugins\\")[1].split("\\")[0];
            console.log("\x1b[1m\x1b[36m" + getTime() + "\x1b[31m [Warn] [" + pluginName + "] " + message + "\x1b[0m");
        }
        console.log("\x1b[1m\x1b[36m" + getTime() + "\x1b[31m [Warn] " + message + "\x1b[0m");
    }

    this.chat = function(message) {
        var path = caller.getData().filePath;
        if (path.indexOf("Vokkit\\plugins\\") != -1) {
            var pluginName = path.split("Vokkit\\plugins\\")[1].split("\\")[0];
            console.log("\x1b[1m\x1b[36m" + getTime() + "\x1b[37m [" + pluginName + "] " + message + "\x1b[0m");
        }
        console.log("\x1b[1m\x1b[36m" + getTime() + "\x1b[37m " + message + "\x1b[0m");
    }
}

module.exports = Logger;