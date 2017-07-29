var Block = require("./block/Block.js");

function Chunk(x, z, chunkData) {
    this.x = x;
    this.z = z;
    this.chunkData = chunkData;

    var chunk = this;

    this.getBlock = function (position) {
        var x = Math.floor(position.x);
        var y = Math.floor(position.y);
        var z = Math.floor(position.z);
        if (chunk.chunkData[x] == undefined) return new Block(position, 0);
        if (chunk.chunkData[x][y] == undefined) return new Block(position, 0);
        return chunk.chunkData[x][y][z] || new Block(position, 0);
    }

    this.setBlock = function (block) {
        var x = Math.floor(block.position.x);
        var y = Math.floor(block.position.y);
        var z = Math.floor(block.position.z);
        if (chunk.chunkData[x] == undefined) chunk.chunkData[x] = [];
        if (chunk.chunkData[x][y] == undefined) chunk.chunkData[x][y] = [];
        chunk.chunkData[x][y][z] = block;
    }

    this.containsPosition = function (position) {
        return position.x >= chunk.x && position.x < chunk.x + 16 && position.z >= chunk.z && position.z < chunk.z + 16;
    }
}

module.exports = Chunk;