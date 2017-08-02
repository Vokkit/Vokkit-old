var Chunk = require("./Chunk.js");

var Block = require("./block/Block.js");

var fs = require("fs");
var path = require("path");



function World(worldName) {
    var world = this;
    var worldName = worldName;
    var worldPath = path.resolve("", "worlds/" + worldName);
    var chunks = [];
    this.prepared = false;
    this.prepareWorld = function (afterdo) {
        var data = fs.readFileSync(worldPath, "UTF-8");
        var lines = data.split("\n");
        var materials = [];
        var position = new THREE.Vector3();
        for (var i in lines) {
            var blockData = lines[i].split(",");
            var maximum = [];
            blockData[0] = parseInt(blockData[0]);
            blockData[1] = parseInt(blockData[1]) + 128;
            blockData[2] = parseInt(blockData[2]);
            blockData[3] = parseInt(blockData[3]);
            if (blockData[3] != 0) {
                if (blockData[3] != 1 && blockData[3] != 2 && blockData[3] != 3) continue;

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
        }

        for (var i in chunks) {
            var chunk = chunks[i];
            var chunkData = chunks[i].chunkData;
            for (var j in chunkData) {
                for (var k in chunkData[j]) {
                    for (var l in chunkData[j][k]) {
                        var blockCount = 0;
                        for (var y = parseInt(k) ; y < 128 ; y++) {
                            if (chunk.getBlock(new THREE.Vector3(j, y, l)).id != 0) blockCount++;
                            if (blockCount >= 5) break;
                        }
                        if (blockCount >= 5) {
                            chunk.setBlock(new Block(new THREE.Vector3(j, k, l), 0));
                        }
                    }
                }
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
        return worldName.replace(".txt", "");
    }
    this.toArray = function () {
        var worldArray = [];
        worldArray.push(world.getWorldName());
        for (var i in chunks) {
            var chunkData = chunks[i].chunkData;
            for (var j in chunkData) {
                for (var k in chunkData[j]) {
                    for (var l in chunkData[j][k]) {
                        if (chunks[i].chunkData[j].id != 0) {
                            worldArray.push([chunkData[j][k][l].position.x, chunkData[j][k][l].position.y, chunkData[j][k][l].position.z, chunkData[j][k][l].id]);
                        }
                    }
                }
            }
        }
        console.log(worldArray);
        return worldArray;
    }
    this.saveWorld = function (afterdo) {
        var lines = [];
        for (var i in chunks) {
            for (var j in chunkData) {
                for (var k in chunkData[j]) {
                    for (var l in chunkData[j][k]) {
                        if (chunks[i].chunkData[j].id != 0) {
                            lines.push([chunkData[j][k][l].position.x, chunkData[j][k][l].position.y, chunkData[j][k][l].position.z, chunkData[j][k][l].id].join(","));
                        }
                    }
                }
            }
        }
        fs.writeFile(worldPath, lines.join("\n"), { encoding: "UTF-8" }, afterdo);
    }
    this.equals = function (world2) {
        return world.getWorldName() == world2.getWorldName();
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