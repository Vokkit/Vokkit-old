var Material = require('../Materials')

var Block = require('../block/Block')

var scene
var group
var rotationGroup
var camera
var renderer
var fps = 60
var materials = []
var THREE = require('three')
var meshes = []
var worldGeometry
var dirtyChunks = []

function SceneManager () {
  this.loginInit = function () {
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
    renderer = new THREE.WebGLRenderer()
    group = new THREE.Group()
    rotationGroup = new THREE.Group()
  }
  this.init = function () {
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    window.onresize = function () {
      camera.aspect = window.innerWidth / window.innerHeight
      camera.updateProjectionMatrix()
      renderer.setSize(window.innerWidth, window.innerHeight)
    }

    materials = Vokkit.getClient().getBlockTextureManager().getTextures()

    rotationGroup.add(group)
    scene.add(rotationGroup)
  }

  this.getCamera = function () {
    return camera
  }

  this.getScene = function () {
    return scene
  }

  this.getGroup = function () {
    return group
  }

  var multiply = new THREE.Vector3(-1, -1, -1)
  this.updateGroup = function (location) {
        // rotationGroup.lookAt(new THREE.Vector3(-Math.sin(location.getYaw()) * Math.cos(location.getPitch()), - Math.sin(location.getPitch()), Math.cos(location.getYaw()) * Math.cos(location.getPitch())));
    camera.lookAt(new THREE.Vector3(-Math.sin(location.getYaw()) * Math.cos(location.getPitch()), Math.sin(location.getPitch()), Math.cos(location.getYaw()) * Math.cos(location.getPitch())))
  }

  this.getRenderer = function () {
    return renderer
  }

  this.getFPS = function () {
    return fps
  }

  this.setFPS = function (FPS) {
    fps = FPS
  }

  this.clearWorld = function () {
    while (group.children.length > 0) {
      group.remove(group.children[0])
    }
  }

  this.drawWorld = function (world) {
    var world = Vokkit.getClient().getWorlds()[0]
    var chunks = world.getChunks()
    for (var i in chunks) {
      var mesher = chunks[i].mesher()
      group.add(mesher)
      console.log(mesher)
    }
    var sky = new THREE.Mesh(new THREE.BoxGeometry(600, 600, 600, 1, 1, 1), new THREE.MeshBasicMaterial({ color: '#7EC0EE' }))
    sky.scale.set(-1, 1, 1)
    group.add(sky)
  }

  this.reloadChunk = function (chunk) {
    if (dirtyChunks.indexOf(chunk) === -1) dirtyChunks.push(chunk)
  }

  this.start = function () {
    var position = new THREE.Vector3()
    var multiply = new THREE.Vector3(-1, -1, -1)
    setInterval(function () {
      var press = Vokkit.getClient().getInputManager().getPress()
      Vokkit.getClient().getMoveManager().moveLocalPlayer(press)
      Vokkit.getClient().getInputManager().mouseControl()

      if (Vokkit.getClient().isDebug()) {
        console.log(Vokkit.getClient().getLocalPlayer().getLocation().getX() + ' : ' + Vokkit.getClient().getLocalPlayer().getLocation().getY() + ' : ' + Vokkit.getClient().getLocalPlayer().getLocation().getZ())
      }
    }, 1000 / fps)
    var draw = function () {
      var localPlayer = Vokkit.getClient().getLocalPlayer()
      if (localPlayer !== undefined) {
        group.position.copy(localPlayer.getEyeLocation().toVector().multiply(multiply))
      }
      for (var i in dirtyChunks) {
        group.remove(dirtyChunks[i].getLastMesh())
        group.add(dirtyChunks[i].mesher())
      }
      dirtyChunks = []
      renderer.render(scene, camera)
    }
    renderer.animate(draw)
  }
}

module.exports = SceneManager
