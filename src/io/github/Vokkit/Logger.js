function Logger(){
    this.info = function(message) {
        var date = new Date();

        var hour = date.getHours();
        hour = (hour < 10 ? "0" : "") + hour;

        var min = date.getMinutes();
        min = (min < 10 ? "0" : "") + min;

        var sec = date.getSeconds();
        sec = (sec < 10 ? "0" : "") + sec;

        console.log("\x1b[1m\x1b[36m" + hour + ":" + min + ":" + sec + "\x1b[37m [INFO] " + message + "\x1b[0m");
    }
}

module.exports = Logger;