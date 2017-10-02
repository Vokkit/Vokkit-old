const fs = require('fs')
const path = require('path')

const SocketManager = require('./SocketManager.js')

class PlayerSkinManager extends SocketManager {
  constructor() {
    super()
    this.skinList = fs.readdirSync(path.join(path.resolve(''), 'public/assets/skins'))
  }
  addListener(socket) {
    let playerSkinManager = this
    socket.on('requestSkin', function () {
      let result = []
      for (let i in playerSkinManager.skinList) {
        if (playerSkinManager.skinList[i].indexOf('#') != -1) {
          if (playerSkinManager.skinList[i].split('#')[1] != socket.id) continue
        }
        result.push(playerSkinManager.skinList[i])
      }
      socket.emit('skin', result)
    })
  }
}

module.exports = PlayerSkinManager