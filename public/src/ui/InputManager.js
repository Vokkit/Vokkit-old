const Block = require('../block/Block')

const press = [false, false, false, false, false, false, false, false]

class InputManager {
  constructor () {
    const renderer = Vokkit.getClient().getSceneManager().getRenderer()
    const camera = Vokkit.getClient().getSceneManager().getCamera()
    renderer.domElement.requestPointerLock = renderer.domElement.requestPointerLock || renderer.domElement.mozRequestPointerLock
    renderer.domElement.onclick = (e) => {
      renderer.domElement.requestPointerLock()
    }

    function onMouseMove (e) {
      var location = Vokkit.getClient().getLocalPlayer().getLocation()
      location.setYaw(location.getYaw() + e.movementX / 1000)
      location.setPitch(location.getPitch() - e.movementY / 1000)
      Vokkit.getClient().getLocalPlayer().teleport(location)
      Vokkit.getClient().getSceneManager().updateGroup(location)
    }

    function onPointerLockChange () {
      if (document.pointerLockElement === renderer.domElement || document.mozPointerLockElement === renderer.domElement) {
        document.addEventListener('mousemove', onMouseMove, false)
      } else {
        document.removeEventListener('mousemove', onMouseMove, false)
      }
    }

    document.addEventListener('pointerlockchange', onPointerLockChange, false)
    document.addEventListener('mozpointerlockchange', onPointerLockChange, false)

    document.addEventListener('keydown', (e) => {
      if (!Vokkit.getClient().getUIManager().isChatting()) {
        if (e.keyCode === 87) { // w
          press[0] = true
        } else if (e.keyCode === 83) { // s
          press[1] = true
        } else if (e.keyCode === 65) { // a
          press[2] = true
        } else if (e.keyCode === 68) { // d
          press[3] = true
        } else if (e.keyCode === 32) { // space
          press[4] = true
        } else if (e.keyCode === 16) { // shift
          press[5] = true
        } else if (e.keyCode >= 49 && e.keyCode <= 57) {
          Vokkit.getClient().getLocalPlayer().setSelectedSlotId(e.keyCode - 49)
          Vokkit.getClient().getUIManager().updateCrossbarSelected()
        }
      } else {
        if (e.keyCode === 13) { // Enter
          let name = Vokkit.getClient().getLocalPlayer().getName()
          let text = document.getElementById('chatText').value
          if (text[0] === '/') {
            Vokkit.getClient().getChatManager().sendCommand(name, text.replace('/', ''))
          } else {
            Vokkit.getClient().getChatManager().sendChat(name, text)
          }
        } else if (e.keyCode === 38) { // 위

        } else if (e.keyCode === 40) { // 아래

        }
      }
      if (e.keyCode === 84) { // t
        Vokkit.getClient().getUIManager().toggleChat()
      }
    })

    document.addEventListener('keyup', (e) => {
      if (e.keyCode === 87) {
        press[0] = false
      } else if (e.keyCode === 83) {
        press[1] = false
      } else if (e.keyCode === 65) {
        press[2] = false
      } else if (e.keyCode === 68) {
        press[3] = false
      } else if (e.keyCode === 32) {
        press[4] = false
      } else if (e.keyCode === 16) {
        press[5] = false
      }
    })

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })

    document.addEventListener('mousedown', (e) => {
      if (e.button === 0 || e.button === undefined) {
        press[6] = true
      } else if (e.button === 1) {
        // 선택된 블럭을 인벤토리에 넣음. TODO
      } else if (e.button === 2) {
        press[7] = true
      }
    })

    document.addEventListener('mouseup', (e) => {
      if (e.button === 0 || e.button === undefined) {
        press[6] = false
      } else if (e.button === 2) {
        press[7] = false
      }
    })

    let lastTimestamp;

    document.addEventListener('mousewheel', e => {
      if (e.timeStamp - lastTimestamp < 1) return
      lastTimestamp = e.timeStamp
      const localPlayer = Vokkit.getClient().getLocalPlayer()
      const UIManager = Vokkit.getClient().getUIManager()
      if (e.deltaY > 0) {
        //아래로 스크롤 - 오른쪽으로 이동
        const selectedSlotId = localPlayer.getSelectedSlotId()
        if (selectedSlotId == 8) localPlayer.setSelectedSlotId(0)
        else localPlayer.setSelectedSlotId(selectedSlotId + 1)
        UIManager.updateCrossbarSelected()
      } else if (e.deltaY < 0) {
        //위로 스크롤 - 왼쪽으로 이동
        const selectedSlotId = localPlayer.getSelectedSlotId()
        if (selectedSlotId == 0) localPlayer.setSelectedSlotId(8)
        else localPlayer.setSelectedSlotId(selectedSlotId - 1)
        UIManager.updateCrossbarSelected()
      }
    })

    this.coolDown = 0
  }

  getPress () {
    return press.slice()
  }

  mouseControl () {
    if ((press[6] || press[7]) && !(press[6] && press[7])) {
      if (this.coolDown > 0) this.coolDown--
      if (this.coolDown === 0) {
        var direction = new THREE.Vector3()
        var blockPosition = new THREE.Vector3()
        var camera = Vokkit.getClient().getSceneManager().getCamera()
        var raycaster = new THREE.Raycaster()
        raycaster.setFromCamera(new THREE.Vector2(0, 0), camera)
        var intersects = raycaster.intersectObjects(Vokkit.getClient().getSceneManager().getGroup().children)
        if (intersects.length > 0) {
          var intersect = intersects[0]
          var uv = intersect.uv
          intersect.point.add(Vokkit.getClient().getSceneManager().getGroup().position.multiplyScalar(-1))
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

          if (press[6]) {
            Vokkit.getClient().getWorlds()[0].setBlock(new Block(blockPosition, 0))
            Vokkit.getClient().getSocket().emit('requestSetBlock', {
              x: blockPosition.x,
              y: blockPosition.y,
              z: blockPosition.z,
              id: 0,
              worldName: Vokkit.getClient().getLocalPlayer().getLocation().getWorld().getWorldName()
            })
          } else if (press[7]) {
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
        this.coolDown = 250 / 1000 * Vokkit.getClient().getSceneManager().getFPS()
      }
    } else this.coolDown = 0
  }
}

module.exports = InputManager
