var Entity = require('./Entity.js')

var PlayerBody = require('../body/PlayerBody.js')

function Player (id, location, velocity, name, isLocalPlayer, type) {
  Entity.call(this, id, location, velocity)
  this.name = name
  this.isLocalPlayer = isLocalPlayer
  this.body = new PlayerBody('steve', this)
  this.type = type
  if (global.bodies == undefined) global.bodies = []
}

Player.prototype = new Entity() // Player extends Entity

Player.prototype.getName = function () {
  return this.name
}

Player.prototype.getEyeLocation = function () {
  var location = this.getLocation()
  location.add(0, 1.8, 0)
  return location
}

Player.prototype.getType = function () {
  return this.type
}

Player.prototype.setType = function (type) {
  this.type = type
}

Player.prototype.teleport = function (location) {
  Entity.prototype.teleport.call(this, location)
  if (this.isLocalPlayer) {
    Vokkit.getClient().getSceneManager().updateGroup(location)
  }
}

Player.prototype.constructor = Player

module.exports = Player
