var Block = require("./block/Block.js");

var fs = require("fs");
var path = require("path");

function World(worldName){
    var world = this;
    var worldName = worldName;
    var worldData = [];
    var fastWorldData = [];
    this.prepareWorld = function(data){
        for (var i in data) {
            var blockData = data[i];
            if (worldData[blockData[0]] == undefined) worldData[blockData[0]] = [];
            if (worldData[blockData[0]][blockData[1]] == undefined) worldData[blockData[0]][blockData[1]] = [];
            worldData[blockData[0]][blockData[1]][blockData[2]] = new Block(new THREE.Vector3(blockData[0], blockData[1], blockData[2]), blockData[3]);
        }
        world.prepared = true;
    }
    this.getBlock = function(position) {
        if (!world.prepared) return;
        /*for (var i in worldData) {
            if (worldData[i].position.equals(position)) {
                return worldData[i];
            }
        }
        return new Block(position, 0);*/
        var x = Math.floor(position.x);
        var y = Math.floor(position.y);
        var z = Math.floor(position.z);
        if (worldData[x] == undefined) return;
        if (worldData[x][y] == undefined) return;
        return worldData[x][y][z];
    }
    this.getWorldName = function(){
        return worldName;
    }
    this.getAllBlocks = function(){
        return worldData;
    }
}

World.prepareWorlds = function(data){
    for (var i in data) {
        var world = new World(i);
        world.prepareWorld(data[i]);
        Vokkit.getClient().addWorld(world);
    }
}

module.exports = World;