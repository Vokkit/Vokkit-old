let Screen = require('../Screen.js')
let InputBinder = require('../InputBinder.js')

const Material = require('../../Materials')
const Block = require('../../block/Block')

let THREE = require("three")

class MainScreen extends Screen {
  constructor () {
    super('MainScreen', new InputBinder())

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.renderer = new THREE.WebGLRenderer()
    this.group = new THREE.Group()
    this.rotationGroup = new THREE.Group()
    this.materials = []

    this.press = [false, false, false, false, false, false, false, false]

    this.dirtyChunks = []
    this.fps = 60
  }

  init () {
    this.initScreen()
    this.initInput()

    document.body.appendChild(this.renderer.domElement)
  }

  initScreen () {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    window.onresize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    this.materials = Vokkit.getClient().getBlockTextureManager().getTextures()

    this.rotationGroup.add(this.group)
    this.scene.add(this.rotationGroup)
  }

  initInput () {
    let renderer = this.getRenderer()

    renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock ||
      renderer.domElement.mozRequestPointerLock
    renderer.domElement.onclick = function (e) {
      renderer.domElement.requestPointerLock()
    }

    this.inputBinder.setMouseMoveListener(event => {
      var location = Vokkit.getClient().getLocalPlayer().getLocation()

      location.setYaw(location.getYaw() + event.movementX / 1000)
      location.setPitch(location.getPitch() - event.movementY / 1000)
      Vokkit.getClient().getLocalPlayer().teleport(location)
      this.updateGroup(location)
    })

    this.inputBinder.setMouseDownListener(event => {
      if (event.button === 0 || event.button === undefined) {
        this.press[6] = true
      } else if (event.button === 1) {
        // 선택된 블럭을 인벤토리에 넣음. TODO
      } else if (event.button === 2) {
        this.press[7] = true
      }
    })

    this.inputBinder.setMouseUpListener(event => {
      if (event.button === 0 || event.button === undefined) {
        this.press[6] = false
      } else if (event.button === 2) {
        this.press[7] = false
      }
    })

    this.inputBinder.setKeyDownListener(event => {
      if (event.keyCode === 87) { // w
        this.press[0] = true
      } else if (event.keyCode === 83) { // s
        this.press[1] = true
      } else if (event.keyCode === 65) { // a
        this.press[2] = true
      } else if (event.keyCode === 68) { // d
        this.press[3] = true
      } else if (event.keyCode === 32) { // space
        this.press[4] = true
      } else if (event.keyCode === 16) { // shift
        this.press[5] = true
      } else if (event.keyCode >= 49 && event.keyCode <= 57) { // 1 ~ 9
        Vokkit.getClient().getLocalPlayer().setSelectedSlotId(event.keyCode - 49)
        Vokkit.getClient().getUIManager().updateCrossbarSelected()
      }
    })

    this.inputBinder.setkeyUpListener(event => {
      if (event.keyCode === 87) {
        this.press[0] = false
      } else if (event.keyCode === 83) {
        this.press[1] = false
      } else if (event.keyCode === 65) {
        this.press[2] = false
      } else if (event.keyCode === 68) {
        this.press[3] = false
      } else if (event.keyCode === 32) {
        this.press[4] = false
      } else if (event.keyCode === 16) {
        this.press[5] = false
      }
    })
  }

  getCamera () {
    return this.camera
  }

  getScene () {
    return this.scene
  }

  getGroup () {
    return this.group
  }

  updateGroup (location) {
    //rotationGroup.lookAt(new THREE.Vector3(-Math.sin(location.getYaw()) * Math.cos(location.getPitch()), - Math.sin(location.getPitch()), Math.cos(location.getYaw()) * Math.cos(location.getPitch())))
    this.camera.lookAt(new THREE.Vector3(-Math.sin(location.getYaw()) * Math.cos(location.getPitch()), Math.sin(location.getPitch()), Math.cos(location.getYaw()) * Math.cos(location.getPitch())))
  }

  getRenderer () {
    return this.renderer
  }

  getFPS () {
    return this.fps
  }

  setFPS (FPS) {
    this.fps = FPS
  }

  clearWorld () {
    while (this.group.children.length > 0) {
      this.group.remove(this.group.children[0])
    }
  }

  reloadChunk (chunk) {
    if (this.dirtyChunks.indexOf(chunk) == -1) {
      this.dirtyChunks.push(chunk)
    }
  }

  drawWorld (world) {
    let chunks = world.getChunks()
    for (let chunk of chunks) {
      let mesher = chunk.mesher()

      this.group.add(mesher)
    }

    let sky = new THREE.Mesh(new THREE.BoxGeometry(600, 600, 600, 1, 1, 1), new THREE.MeshBasicMaterial({ color: "#7EC0EE" }))
    sky.scale.set(-1, 1, 1)
    this.group.add(sky)

    console.log('draw!')
  }

  start () {
    let position = new THREE.Vector3()
    let multiply = new THREE.Vector3(-1, -1, -1)

    setInterval(() => {
      Vokkit.getClient().getMoveManager().moveLocalPlayer(this.press)

      this.syncMouse()
    }, 1000 / this.fps)

    this.renderer.animate(() => {
      let localPlayer = Vokkit.getClient().getLocalPlayer()

      if (localPlayer != undefined) {
        this.group.position.copy(localPlayer.getEyeLocation().toVector().multiply(multiply))
      }

      for (let chunk of this.dirtyChunks) {
        this.group.remove(chunk.getLastMesh())
        this.group.add(chunk.mesher())
      }
      this.dirtyChunks = []

      this.renderer.render(this.scene, this.camera)
    })
  }

  syncMouse() {
    if ((this.press[6] || this.press[7]) && !(this.press[6] && this.press[7])) {
      if (this.coolDown > 0) this.coolDown--
      if (this.coolDown === 0) {
        var direction = new THREE.Vector3()
        var blockPosition = new THREE.Vector3()
        var camera = this.camera
        var raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
        var intersects = raycaster.intersectObjects(this.group.children)
        if (intersects.length > 0) {
          var intersect = intersects[0]
          var uv = intersect.uv
          intersect.point.add(this.group.position.multiplyScalar(-1))
          var x = Math.floor(intersect.point.x)
          var y = Math.floor(intersect.point.y)
          var z = Math.floor(intersect.point.z)
          if (uv.x >= 0.0 && uv.x < 0.25 && uv.y >= 0 && uv.y < 0.5) {
                          // x-
            blockPosition.set(x - 1, y, z)
            direction.set(1, 0, 0)
          } else if (uv.x >= 0.25 && uv.x < 0.5 && uv.y >= 0 && uv.y < 0.5) {
                          // x+
            blockPosition.set(x, y, z)
            direction.set(-1, 0, 0)
          } else if (uv.x >= 0.25 && uv.x < 0.5 && uv.y >= 0.5 && uv.y < 1) {
                          // y-
            blockPosition.set(x, y - 1, z)
            direction.set(0, 1, 0)
          } else if (uv.x >= 0.5 && uv.x < 0.75 && uv.y >= 0.5 && uv.y < 1) {
                          // y+
            blockPosition.set(x, y, z)
            direction.set(0, -1, 0)
          } else if (uv.x >= 0.5 && uv.x < 0.75 && uv.y >= 0 && uv.y < 0.5) {
                          // z-
            blockPosition.set(x, y, z - 1)
            direction.set(0, 0, 1)
          } else if (uv.x >= 0.75 && uv.x < 1 && uv.y >= 0 && uv.y < 0.5) {
                          // z+
            blockPosition.set(x, y, z)
            direction.set(0, 0, -1)
          }

          if (this.press[6]) {
            Vokkit.getClient().getWorlds()[0].setBlock(new Block(blockPosition, 0))
            Vokkit.getClient().getSocket().emit('requestSetBlock', {
              x: blockPosition.x,
              y: blockPosition.y,
              z: blockPosition.z,
              id: 0,
              worldName: Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getWorldName()
            })
          } else if (this.press[7]) {
            var blockPlacePosition = blockPosition.clone().add(direction)
            Vokkit.getClient().getWorlds()[0].setBlock(new Block(blockPlacePosition, 1))
            Vokkit.getClient().getSocket().emit('requestSetBlock', {
              x: blockPlacePosition.x,
              y: blockPlacePosition.y,
              z: blockPlacePosition.z,
              id: 1,
              worldName: Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getWorldName()
            })
          }
        }
        this.coolDown = 250 / 1000 * this.fps
      }
    } else this.coolDown = 0
  }
}

module.exports = MainScreen
