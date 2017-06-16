var Block = require("./block/Block.js");

var fs = require("fs");
var path = require("path");
var THREE = require("three");

function World(worldName){
    var world = this;
    var worldName = worldName;
    var worldData = [];
    var worldPath = path.resolve("", "worlds/" + worldName);
    this.prepared = false;
    this.prepareWorld = function(afterdo){
        fs.readFile(worldPath, "UTF-8", function(err, data){
            var lines = data.split("\n");
            for (var i in lines) {
                var blockData = lines[i].split(",");
                worldData.push(new Block(new THREE.Vector3(parseInt(blockData[0]), parseInt(blockData[1]), parseInt(blockData[2])), parseInt(blockData[3])));
            }
            world.prepared = true;
            console.log(worldData);
            if (afterdo !== undefined) afterdo(world);
        });
    }
    this.getBlock = function(position) {
        if (!this.prepared) return null;
        for (var i in worldData) {
            if (worldData[i].position.equals(position)) {
                return worldData[i];
            }
        }
        return new Block(position, 0);
    }
    this.getWorldName = function(){
        return worldName;
    }
    this.saveWorld = function(afterdo){
        var lines = [];
        for (var i in worldData) {
            if (worldData[i].id != 0) {
                lines.push(worldData[i].position.x + "," + worldData[i].position.y + "," + worldData[i].position.z + "," + worldData[i].id);
            }
        }
        fs.writeFile(worldPath, lines.join("\n"), {encoding: "UTF-8"}, afterdo);
    }
}

World.getAllWorlds = function(){
    var worldNames = fs.readdirSync(path.resolve("", "worlds"));
    var worlds = [];
    for (var i in worldNames) {
        if (worldNames[i].substring(worldNames[i].lastIndexOf(".") + 1, worldNames[i].length) == "txt") {
            worlds.push(new World(worldNames[i]));
        }
    }
    return worlds;
}

module.exports = World;