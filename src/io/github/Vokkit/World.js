const Chunk = require('./Chunk.js')

const Block = require('./block/Block.js')

const fs = require('fs')
const path = require('path')

class World {
  constructor (worldName) {
    this.worldName = worldName
    this.worldPath = path.resolve('', 'worlds/' + worldName)
    this.chunks = []
    this.prepared = false
  }

  prepareWorld () {
    let data = fs.readFileSync(this.worldPath, 'UTF-8')
    let lines = data.split('\n')
    let position = new THREE.Vector3()
    for (let i in lines) {
      let blockData = lines[i].split(',')
      blockData.forEach((v, i) => { blockData[i] = parseInt(v) })
      if (blockData[3] !== 0) {
        //if (blockData[3] !== 1 && blockData[3] !== 2 && blockData[3] !== 3) continue

        let chunkExists = false
        for (let i in this.chunks) {
          if (this.chunks[i].containsPosition(position.set(blockData[0], blockData[1], blockData[2]))) {
            if (typeof this.chunks[i].chunkData[blockData[0]] === 'undefined') this.chunks[i].chunkData[blockData[0]] = []
            if (typeof this.chunks[i].chunkData[blockData[0]][blockData[1]] === 'undefined') this.chunks[i].chunkData[blockData[0]][blockData[1]] = []
            this.chunks[i].chunkData[blockData[0]][blockData[1]][blockData[2]] = new Block(new THREE.Vector3(blockData[0], blockData[1], blockData[2]), blockData[3])
            chunkExists = true
            break
          }
        }
        if (!chunkExists) {
          let chunk = new Chunk(Math.floor(blockData[0] / 16) * 16, Math.floor(blockData[2] / 16) * 16, [])
          if (typeof chunk.chunkData[blockData[0]] === 'undefined') chunk.chunkData[blockData[0]] = []
          if (typeof chunk.chunkData[blockData[0]][blockData[1]] === 'undefined') chunk.chunkData[blockData[0]][blockData[1]] = []
          chunk.chunkData[blockData[0]][blockData[1]][blockData[2]] = new Block(new THREE.Vector3(blockData[0], blockData[1], blockData[2]), blockData[3])
          this.chunks.push(chunk)
        }
      }
    }

    for (let i in this.chunks) {
      let chunk = this.chunks[i]
      let chunkData = this.chunks[i].chunkData
      for (let j in chunkData) {
        for (let k in chunkData[j]) {
          for (let l in chunkData[j][k]) {
            let blockCount = 0
            for (let y = parseInt(k); y < 128; y++) {
              if (chunk.getBlock(new THREE.Vector3(j, y, l)).id !== 0) blockCount++
              if (blockCount >= 5) break
            }
            if (blockCount >= 5) {
              chunk.setBlock(new Block(new THREE.Vector3(j, k, l), 0))
            }
          }
        }
      }
    }
    this.prepared = true
  }

  getBlock (position) {
    if (!this.prepared) return
    for (let i in this.chunks) {
      if (this.chunks[i].containsPosition(position)) {
        return this.chunks[i].getBlock(position)
      }
    }
    return new Block(position, 0)
  }

  setBlock (block) {
    if (!this.prepared) return
    let chunkExists = false
    for (let i in this.chunks) {
      if (this.chunks[i].containsPosition(block.position)) {
        this.chunks[i].setBlock(block)
        chunkExists = true
        break
      }
    }
    if (!chunkExists) {
      let chunk = new Chunk(Math.floor(block.position.x / 16) * 16, Math.floor(block.position.z / 16) * 16, [])
      chunk.setBlock(block)
      this.chunks.push(chunk)
    }
    Vokkit.getServer().getSocketServer().emit('setBlock', {
      x: block.position.x,
      y: block.position.y,
      z: block.position.z,
      id: block.id,
      worldName: this.getWorldName()
    })
  }

  getWorldName () {
    return this.worldName.replace('.txt', '')
  }

  toArray () {
    let worldArray = []
    worldArray.push(this.getWorldName())
    for (let i in this.chunks) {
      let chunkData = this.chunks[i].chunkData
      for (let j in chunkData) {
        for (let k in chunkData[j]) {
          for (let l in chunkData[j][k]) {
            if (this.chunks[i].chunkData[j].id !== 0) {
              worldArray.push([chunkData[j][k][l].position.x, chunkData[j][k][l].position.y, chunkData[j][k][l].position.z, chunkData[j][k][l].id])
            }
          }
        }
      }
    }
    return worldArray
  }

  saveWorld (afterdo) {
    let lines = []
    for (let i in this.chunks) {
      let chunkData = this.chunks[i].chunkData
      for (let j in chunkData) {
        for (let k in chunkData[j]) {
          for (let l in chunkData[j][k]) {
            if (this.chunks[i].chunkData[j].id !== 0) {
              lines.push([chunkData[j][k][l].position.x, chunkData[j][k][l].position.y, chunkData[j][k][l].position.z, chunkData[j][k][l].id].join(','))
            }
          }
        }
      }
    }
    fs.writeFile(this.worldPath, lines.join('\n'), { encoding: 'UTF-8' }, afterdo)
  }

  equals (world) {
    return this.getWorldName() === world.getWorldName()
  }

  static loadAllWorlds () {
    let worldNames = fs.readdirSync(path.resolve('', 'worlds'))
    let worlds = []
    for (let i in worldNames) {
      if (worldNames[i].substring(worldNames[i].lastIndexOf('.') + 1, worldNames[i].length) === 'txt') {
        let world = new World(worldNames[i])
        world.prepareWorld()
        worlds.push(world)
      }
    }
    return worlds
  }
}

module.exports = World
