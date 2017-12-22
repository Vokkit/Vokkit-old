const Player = require('../entity/Player.js')
const Location = require('../Location.js')

const PlayerLoginEvent = require('../event/player/PlayerLoginEvent.js')
const PlayerJoinEvent = require('../event/player/PlayerJoinEvent.js')

const SocketManager = require('./SocketManager.js')

class LoginManager extends SocketManager {
  addListener (socket) {
    socket.on('login', function (data) {
      let player = new Player(socket.id, new Location(Vokkit.getServer().getWorlds()[0], 0, 0, 0, 0, 0), new THREE.Vector3(0, 0, 0), 20, data.name, socket, data.type)
      let address = socket.request.connection._peername
      let playerLoginEvent = new PlayerLoginEvent(player, address.address)
      Vokkit.getServer().getPluginManager().makeEvent(playerLoginEvent)
      if (playerLoginEvent.isCancelled()) {
        socket.emit('loginResult', {
          succeed: false,
          reason: playerLoginEvent.getReason()
        })
        return
      }
      if (data.name.length === 0) {
        socket.emit('loginResult', {
          succeed: false,
          reason: '공백 ID를 사용할 수 없습니다.'
        })
        return
      }
      if (data.name.length >= 20) {
        socket.emit('loginResult', {
          succeed: false,
          reason: 'ID는 20자를 넘을 수 없습니다.'
        })
        return
      }
      let playerList = Vokkit.getServer().getPlayers()
      for (let i in playerList) {
        if (playerList[i].getName() === player.getName()) {
          socket.emit('loginResult', {
            succeed: false,
            reason: '이름이 중복됩니다.'
          })
          return
        }
      }
      let sendPlayers = []
      for (let i in playerList) {
        sendPlayers.push(playerList[i].toObject())
      }
      sendPlayers.push(player.toObject())
      socket.emit('loginResult', {
        succeed: true,
        players: sendPlayers,
        worlds: Vokkit.getServer().getWorldManager().getWorldArray()
      })
      Vokkit.getServer().addPlayer(player)
      Vokkit.getServer().getLogger().info(player.getName() + '[' + address.address + ':' + address.port + ', type: ' + player.getType() + '] 이가 로그인 했습니다.')
      let playerJoinEvent = new PlayerJoinEvent(player)
      Vokkit.getServer().getPluginManager().makeEvent(playerJoinEvent)
      Vokkit.getServer().getSocketServer().emit('playerJoin', player.toObject())
      Vokkit.getServer().getLogger().title('Vokkit v0.0.1 (' + Vokkit.getServer().getPlayers().length + ')')
    })
  }
}

module.exports = LoginManager
