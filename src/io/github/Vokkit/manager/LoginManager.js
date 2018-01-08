const Player = require('../entity/Player.js')
const Location = require('../Location.js')

const PlayerLoginEvent = require('../event/player/PlayerLoginEvent.js')
const PlayerJoinEvent = require('../event/player/PlayerJoinEvent.js')
const Server = require('../Server')

const SocketManager = require('./SocketManager.js')
const Lang = require('../lang/Lang')

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
          reason: Lang.format('login.empty_id')
        })
        return
      }
      if (data.name.length >= 20) {
        socket.emit('loginResult', {
          succeed: false,
          reason: Lang.format('login.long_id')
        })
        return
      }
      let playerList = Vokkit.getServer().getPlayers()
      for (let i in playerList) {
        if (playerList[i].getName() === player.getName()) {
          socket.emit('loginResult', {
            succeed: false,
            reason: Lang.format('login.same_id')
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
      Vokkit.getServer().getLogger().info(Lang.format('player.login.message', [player.getName(), address.address, address.port]))
      let playerJoinEvent = new PlayerJoinEvent(player, Lang.format('player.login.format'))
      Vokkit.getServer().getPluginManager().makeEvent(playerJoinEvent)
      Vokkit.getServer().getSocketServer().emit('playerJoin', player.toObject())
      Vokkit.getServer().getLogger().title(Lang.format('player.list.log'), [Server.version, Vokkit.getServer().getPlayers().length])
      Vokkit.getServer().getChatManager().broadcast(Lang.formatString(playerJoinEvent.getJoinMessage(), [player.getName()]))
    })
  }
}

module.exports = LoginManager
