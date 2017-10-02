var readline = require('readline');

var ConsoleCommandSender = require("./ConsoleCommandSender.js");

var CommandManager = require("../manager/CommandManager.js");

class ConsoleManager {
    init() {
        var sender = new ConsoleCommandSender();
        var rl = readline.createInterface(process.stdin, process.stdout);
        rl.setPrompt('> ');
        rl.prompt(true);
        rl.on('line', function (line) {
          CommandManager.call(line)
          rl.prompt();
        }).on('close', function () {
            process.exit(0);
        });
    }
}

module.exports = ConsoleManager;
