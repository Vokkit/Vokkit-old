const fs = require('fs')

class WorldGenerator {
  constructor (width = 50, height = 50) {
    this.width = width
    this.height = height
  }

  generate () {
    const promise = new Promise((resolve, reject) => {
      const widthSeed = new Date().getTime()
      const heightSeed = (new Date().getTime() << 2) / 4

      let value = ''

      const time = new Date().getTime()
      const seed = time / (Math.floor(Math.log10(time)) * 10)
      const r1 = Math.random() * 0.5 + 0.75
      const r2 = Math.random() * 0.5 + 0.75

      for (let x = 0; x < this.width; x++) {
        for (let z = 0; z < this.height; z++) {
          let y = Math.floor(this.noise2d(seed * r1 + x, seed * r2 + z) + 50)

          value += `${x},${y},${z},${2}\n`
          value += `${x},${y - 1},${z},${3}\n`
          value += `${x},${y - 2},${z},${1}\n`
          value += `${x},${y - 3},${z},${1}\n`
          value += `${x},${y - 4},${z},${1}\n`
        }
      }

      fs.writeFile('./worlds/world.txt', value, err => {
        if (err) {
          Vokkit.getServer().getLogger().warn(err)
          reject(err)
        } else {
          Vokkit.getServer().getLogger().info('월드 생성됨')
          resolve()
        }
      })
    })

    return promise
  }

  n (n, f, a) {
    return Math.sin(n * f) * a
  }

  noise1d (seed) {
    let v = 0
    for (let i = 0, j = 0.3; i < 4; i++, j *= 1.7) {
      v += this.n(seed + j, 0.18 * j, 6 / j)
    }

    return v
  }

  noise2d (seed1, seed2) {
    return (this.noise1d(seed1) + this.noise1d(seed2)) / 2
  }
}

module.exports = WorldGenerator
