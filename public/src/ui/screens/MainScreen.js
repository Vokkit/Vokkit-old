const Screen = require('../Screen.js')

const Block = require('../../block/Block')
const BlockList = require('../../block/BlockList.js')

const THREE = require('three')

const CHUNK_SIGHT = 3

class MainScreen extends Screen {
  constructor () {
    super('MainScreen', 'base', null)

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1)
    this.renderer = new THREE.WebGLRenderer()
    this.group = new THREE.Group()
    this.rotationGroup = new THREE.Group()

    this.press = [false, false, false, false, false, false, false, false]

    this.dirtyChunks = []

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
    const vector = new THREE.Vector3(-Math.sin(location.getYaw()) * Math.cos(location.getPitch()), Math.sin(location.getPitch()), Math.cos(location.getYaw()) * Math.cos(location.getPitch()))
    this.camera.lookAt(vector)
  }

  getRenderer () {
    return this.renderer
  }

  clearWorld () {
    while (this.group.children.length > 0) {
      this.group.remove(this.group.children[0])
    }
  }

  reloadChunk (chunk) {
    if (this.dirtyChunks.indexOf(chunk) === -1) {
      this.dirtyChunks.push(chunk)
    }
  }

  drawWorld (world) {
    let chunks = world.getChunks()
    for (let chunk of chunks) {
      this.group.add(chunk.mesher())
    }

    const light = new THREE.PointLight(0xffffff, 1, 100)
    light.position.set(0, 10, 0)
    light.castShadow = true
    
    this.scene.add(light)
    this.renderer.setClearColor(0x7EC0EE, 1)
  }

  start () {
    const multiply = new THREE.Vector3(-1, -1, -1)

    let last = Date.now()
    const move = () => {
      const now = Date.now()
      // fps: 1000 / (now - last)
      Vokkit.getClient().getMoveManager().moveLocalPlayer(this.press)
      last = now

      this.syncMouse()
      requestAnimationFrame(move)
    }
    requestAnimationFrame(move)

    this.renderer.animate(() => {
      const localPlayer = Vokkit.getClient().getLocalPlayer()

      if (typeof localPlayer !== 'undefined') {
        this.group.position.copy(localPlayer.getEyeLocation().toVector().multiply(multiply))
      }

      // 청크범위 넘으면 지우고 무시한다.
      const chunks = localPlayer.getLocation().getWorld().getChunks()
      const location = localPlayer.getLocation()
      const ignore = []
      for (const i in chunks) {
        if (Math.sqrt(Math.pow(location.x - chunks[i].x - 8, 2) + Math.pow(location.z - chunks[i].z - 8, 2)) > CHUNK_SIGHT * 16) {
          ignore.push(chunks[i])
          this.group.remove(chunks[i].getLastMesh())
        } else {
          if (this.group.children.indexOf(chunks[i].getLastMesh()) === -1) {
            this.group.add(chunks[i].getLastMesh())
          }
        }
      }

      for (const i in this.dirtyChunks) {
        const chunk = this.dirtyChunks[i]
        if (ignore.indexOf(chunk) !== -1) continue
        this.group.remove(chunk.getLastMesh())
        this.group.add(chunk.mesher())
      }
      this.dirtyChunks = []

      this.renderer.render(this.scene, this.camera)
    })
  }

  syncMouse () {
    if ((this.press[6] || this.press[7]) && !(this.press[6] && this.press[7])) {
      if (this.coolDown > 0) this.coolDown--
      if (this.coolDown === 0) {
        const direction = new THREE.Vector3()
        const blockPosition = new THREE.Vector3()
        const camera = this.camera
        const raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
        const intersects = raycaster.intersectObjects(this.group.children)
        if (intersects.length > 0) {
          const intersect = intersects[0]
          intersect.point.add(this.group.position.multiplyScalar(-1))
          const x = Math.floor(intersect.point.x)
          const y = Math.floor(intersect.point.y)
          const z = Math.floor(intersect.point.z)
          if (intersect.point.x % 1 === 0) {
            const block = Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getBlock(new THREE.Vector3(x, y, z))
            if (block.getId() === 0 || block.getId() == null) {
              blockPosition.set(x - 1, y, z)
              direction.set(1, 0, 0)
            } else {
              blockPosition.set(x, y, z)
              direction.set(-1, 0, 0)
            }
          }

          if (intersect.point.y % 1 === 0) {
            const block = Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getBlock(new THREE.Vector3(x, y, z))
            if (block.getId() === 0 || block.getId() == null) {
              blockPosition.set(x, y - 1, z)
              direction.set(0, 1, 0)
            } else {
              blockPosition.set(x, y, z)
              direction.set(0, -1, 0)
            }
          }

          if (intersect.point.z % 1 === 0) {
            const block = Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getBlock(new THREE.Vector3(x, y, z))
            if (block.getId() === 0 || block.getId() == null) {
              blockPosition.set(x, y, z - 1)
              direction.set(0, 0, 1)
            } else {
              blockPosition.set(x, y, z)
              direction.set(0, 0, -1)
            }
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

            const blockPlacePosition = blockPosition.clone().add(direction)
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
        this.coolDown = 250
      }
    } else this.coolDown = 0
  }
}

module.exports = MainScreen
