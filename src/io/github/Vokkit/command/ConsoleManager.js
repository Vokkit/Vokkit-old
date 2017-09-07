var readline = require('readline');

var ConsoleCommandSender = require("./ConsoleCommandSender.js");

var ServerCommandEvent = require("../event/server/ServerCommandEvent.js");

class ConsoleManager {
    init() {
        var sender = new ConsoleCommandSender();
        var rl = readline.createInterface(process.stdin, process.stdout);
        rl.setPrompt('> ');
        rl.prompt(true);
        rl.on('line', function (line) {
            var event = new ServerCommandEvent(sender, line);
            Vokkit.getServer().getPluginManager().makeEvent(event);
            rl.prompt();
        }).on('close', function () {
            process.exit(0);
        });
    }
}

module.exports = ConsoleManager;