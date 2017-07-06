var Block = require("./block/Block.js");

var fs = require("fs");
var path = require("path");

function World(worldName) {
    var world = this;
    var worldName = worldName;
    var worldData = [];
    var worldPath = path.resolve("", "worlds/" + worldName);
    this.prepared = false;
    this.prepareWorld = function (afterdo) {
        var data = fs.readFileSync(worldPath, "UTF-8");
        var lines = data.split("\n");
        var materials = [];
        for (var i in lines) {
            var blockData = lines[i].split(",");
            var blockX = parseInt(blockData[0]);
            var blockY = parseInt(blockData[1]);
            var blockZ = parseInt(blockData[2]);
            var blockId = parseInt(blockData[3]);
            if (blockId != 0 && blockId != 1 && blockId != 8 && blockId != 9 && 150 < Math.abs(blockX) && Math.abs(blockX) < 300 && 100 < Math.abs(blockZ) && Math.abs(blockZ) < 300 && blockY > -100) {
                worldData.push(new Block([blockX, blockY, blockZ], blockId));
            }
        }
        console.log(worldData);
        world.prepared = true;
    }
    this.getBlock = function (position) {
        if (!this.prepared) return null;
        for (var i in worldData) {
            if (worldData[i].position[0] == position[0] && worldData[i].position[1] == position[1] && worldData[i].position[2] == position[2]) {
                return worldData[i];
            }
        }
        return new Block(position, 0);
    }
    this.getWorldName = function () {
        return worldName;
    }
    this.toArray = function () {
        var worldArray = [];
        for (var i in worldData) {
            if (worldData[i].id != 0) {
                worldArray.push([worldData[i].position[0], worldData[i].position[1], worldData[i].position[2], worldData[i].id]);
            }
        }
        return worldArray;
    }
    this.saveWorld = function (afterdo) {
        var lines = [];
        for (var i in worldData) {
            if (worldData[i].id != 0) {
                lines.push(worldData[i].position[0] + "," + worldData[i].position[1] + "," + worldData[i].position[2] + "," + worldData[i].id);
            }
        }
        fs.writeFile(worldPath, lines.join("\n"), { encoding: "UTF-8" }, afterdo);
    }
}

World.getAllWorlds = function () {
    var worldNames = fs.readdirSync(path.resolve("", "worlds"));
    var worlds = [];
    for (var i in worldNames) {
        if (worldNames[i].substring(worldNames[i].lastIndexOf(".") + 1, worldNames[i].length) == "txt") {
            var world = new World(worldNames[i]);
            world.prepareWorld();
            worlds.push(world);
        }
    }
    return worlds;
}

module.exports = World;