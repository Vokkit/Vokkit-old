let Screen = require('../Screen.js')
let InputBinder = require('../InputBinder.js')

const Block = require('../../block/Block')
const BlockList = require('../../block/BlockList.js')

let THREE = require('three')

const CHUNK_SIGHT = 4

class MainScreen extends Screen {
  constructor () {
    super('MainScreen', 'base', null)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 16 * CHUNK_SIGHT)
    this.renderer = new THREE.WebGLRenderer()
    this.group = new THREE.Group()
    this.rotationGroup = new THREE.Group()

    this.press = [false, false, false, false, false, false, false, false]

    this.dirtyChunks = []
    this.fps = 60

    this.init()
  }

  init () {
    this.initScreen()

    this.dom = this.renderer.domElement
  }

  initScreen () {
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    window.onresize = () => {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()
      this.renderer.setSize(window.innerWidth, window.innerHeight)
    }

    this.rotationGroup.add(this.group)
    this.scene.add(this.rotationGroup)
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
    // rotationGroup.lookAt(new THREE.Vector3(-Math.sin(location.getYaw()) * Math.cos(location.getPitch()), - Math.sin(location.getPitch()), Math.cos(location.getYaw()) * Math.cos(location.getPitch())))
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
      for (const c of chunk.mesher()) {
        this.group.add(c)
      }
    }


    this.renderer.setClearColor(0x7EC0EE, 1)
  }

  start () {
    let position = new THREE.Vector3()
    let multiply = new THREE.Vector3(-1, -1, -1)

    const move = () => {
      Vokkit.getClient().getMoveManager().moveLocalPlayer(this.press)

      this.syncMouse()
      requestAnimationFrame(move)
    }
    requestAnimationFrame(move)

    this.renderer.animate(() => {
      let localPlayer = Vokkit.getClient().getLocalPlayer()

      if (localPlayer != undefined) {
        this.group.position.copy(localPlayer.getEyeLocation().toVector().multiply(multiply))
      }

      for (let chunk of this.dirtyChunks) {
        this.group.remove(chunk.getLastMesh())

        for (const c of chunk.mesher()) {
          this.group.add(c)
        }
      }
      this.dirtyChunks = []

      this.renderer.render(this.scene, this.camera)
    })
  }

  syncMouse () {
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
            Vokkit.getClient().getWorlds()[0].setBlock(new Block(blockPosition, BlockList.AIR))
            Vokkit.getClient().getSocket().emit('requestSetBlock', {
              x: blockPosition.x,
              y: blockPosition.y,
              z: blockPosition.z,
              id: 0,
              worldName: Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getWorldName()
            })
          } else if (this.press[7]) {
            const id = Vokkit.getClient().getLocalPlayer().getSelectedSlotId() + 1

            var blockPlacePosition = blockPosition.clone().add(direction)
            Vokkit.getClient().getWorlds()[0].setBlock(new Block(blockPlacePosition, id))
            Vokkit.getClient().getSocket().emit('requestSetBlock', {
              x: blockPlacePosition.x,
              y: blockPlacePosition.y,
              z: blockPlacePosition.z,
              id: id,
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
