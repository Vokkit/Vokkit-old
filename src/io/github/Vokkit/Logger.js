var caller = require("caller-id");

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

/*function Logger(){
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
            return;
        }
        console.log("\x1b[1m\x1b[36m" + getTime() + "\x1b[37m [INFO] " + message + "\x1b[0m");
    }

    this.warn = function(message) {
        var path = caller.getData().filePath;
        if (path.indexOf("Vokkit\\plugins\\") != -1) {
            var pluginName = path.split("Vokkit\\plugins\\")[1].split("\\")[0];
            console.log("\x1b[1m\x1b[36m" + getTime() + "\x1b[31m [Warn] [" + pluginName + "] " + message + "\x1b[0m");
            return;
        }
        console.log("\x1b[1m\x1b[36m" + getTime() + "\x1b[31m [Warn] " + message + "\x1b[0m");
    }

    this.chat = function(message) {
        var path = caller.getData().filePath;
        if (path.indexOf("Vokkit\\plugins\\") != -1) {
            var pluginName = path.split("Vokkit\\plugins\\")[1].split("\\")[0];
            console.log("\x1b[1m\x1b[36m" + getTime() + "\x1b[37m [" + pluginName + "] " + message + "\x1b[0m");
            return;
        }
        console.log("\x1b[1m\x1b[36m" + getTime() + "\x1b[37m " + message + "\x1b[0m");
    }
}*/

class Logger{
}

Logger.prototype.info = function(message) {
    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);
    var path = caller.getData().filePath;
    if (path.indexOf("Vokkit\\plugins\\") != -1) {
        var pluginName = path.split("Vokkit\\plugins\\")[1].split("\\")[0];
        process.stdout.write("\x1b[1m\x1b[36m" + getTime() + "\x1b[37m [INFO] [" + pluginName + "] " + message + "\x1b[0m\n> ");
        return;
    }
    process.stdout.write("\x1b[1m\x1b[36m" + getTime() + "\x1b[37m [INFO] " + message + "\x1b[0m\n> ");
}

Logger.prototype.warn = function(message) {
    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);
    var path = caller.getData().filePath;
    if (path.indexOf("Vokkit\\plugins\\") != -1) {
        var pluginName = path.split("Vokkit\\plugins\\")[1].split("\\")[0];
        process.stdout.write("\x1b[1m\x1b[36m" + getTime() + "\x1b[31m [Warn] [" + pluginName + "] " + message + "\x1b[0m\n> ");
        return;
    }
    process.stdout.write("\x1b[1m\x1b[36m" + getTime() + "\x1b[31m [Warn] " + message + "\x1b[0m\n> ");
}

Logger.prototype.chat = function(message) {
    process.stdout.clearLine();  // clear current text
    process.stdout.cursorTo(0);
    var path = caller.getData().filePath;
    if (path.indexOf("Vokkit\\plugins\\") != -1) {
        var pluginName = path.split("Vokkit\\plugins\\")[1].split("\\")[0];
        process.stdout.write("\x1b[1m\x1b[36m" + getTime() + "\x1b[37m [" + pluginName + "] " + message + "\x1b[0m\n> ");
        return;
    }
    process.stdout.write("\x1b[1m\x1b[36m" + getTime() + "\x1b[37m " + message + "\x1b[0m\n> ");
}

module.exports = Logger;