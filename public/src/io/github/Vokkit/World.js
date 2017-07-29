var Block = require("./block/Block.js");

var Chunk = require("./Chunk.js");

var fs = require("fs");
var path = require("path");

function World(worldName) {
    var world = this;
    var worldName = worldName;
    var worldData = [];
    var chunks = [];
    this.prepareWorld = function (data) {
        var position = new THREE.Vector3();
        for (var i in data) {
            var blockData = data[i];
            var chunkExists = false;
            for (var i in chunks) {
                if (chunks[i].containsPosition(position.set(blockData[0], blockData[1], blockData[2]))) {
                    if (chunks[i].chunkData[blockData[0]] == undefined) chunks[i].chunkData[blockData[0]] = [];
                    if (chunks[i].chunkData[blockData[0]][blockData[1]] == undefined) chunks[i].chunkData[blockData[0]][blockData[1]] = [];
                    chunks[i].chunkData[blockData[0]][blockData[1]][blockData[2]] = new Block(new THREE.Vector3(blockData[0], blockData[1], blockData[2]), blockData[3]);
                    chunkExists = true;
                    break;
                }
            }
            if (!chunkExists) {
                var chunk = new Chunk(Math.floor(blockData[0] / 16) * 16, Math.floor(blockData[2] / 16) * 16, []);
                if (chunk.chunkData[blockData[0]] == undefined) chunk.chunkData[blockData[0]] = [];
                if (chunk.chunkData[blockData[0]][blockData[1]] == undefined) chunk.chunkData[blockData[0]][blockData[1]] = [];
                chunk.chunkData[blockData[0]][blockData[1]][blockData[2]] = new Block(new THREE.Vector3(blockData[0], blockData[1], blockData[2]), blockData[3]);
                chunks.push(chunk);
            }
        }
        world.prepared = true;
    }
    this.getBlock = function (position) {
        if (!world.prepared) return;
        for (var i in chunks) {
            if (chunks[i].containsPosition(position)) {
                return chunks[i].getBlock(position);
            }
        }
        return new Block(position, 0);
    }

    this.setBlock = function (block) {
        if (!world.prepared) return;
        var chunkExists = false;
        for (var i in chunks) {
            if (chunks[i].containsPosition(block.position)) {
                chunks[i].setBlock(block);
                chunkExists = true;
                break;
            }
        }
        if (!chunkExists) {
            var chunk = new Chunk(Math.floor(block.position.x / 16) * 16, Math.floor(block.position.z / 16) * 16, []);
            chunk.setBlock(block);
            chunks.push(chunk);
        }
    }

    this.getWorldName = function () {
        return worldName;
    }
    /*this.getAllBlocks = function () {
        return worldData;
    }*/
    this.getChunks = function () {
        return chunks;
    }
}

World.prepareWorlds = function (data) {
    for (var i in data) {
        var world = new World(data[i][0]);
        data[i].splice(0, 1);
        world.prepareWorld(data[i]);
        Vokkit.getClient().addWorld(world);
    }
}

module.exports = World;