var PluginBase = require("../io/github/Vokkit/plugin/PluginBase.js");

class Main extends PluginBase{
    onLoad(){
        alert("I am loaded!!!!!");
    }

    onEnable(){
        alert("I am enabled!!!!!");
    }
}

module.exports = Main;