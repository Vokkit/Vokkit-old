const Block = require('../block/Block')

class InputManager {
  constructor () {

  }

  init () {
    function onMouseMove (e) {
      Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().mouseMoveListener(e)
    }

    function onMouseDown (e) {
      Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().mouseDownListener(e)
    }

    function onMouseUp (e) {
      Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().mouseUpListener(e)
    }

    function onPointerLockChange () {
      //if (document.pointerLockElement === renderer.domElement || document.mozPointerLockElement === renderer.domElement) {
        document.onmousemove = onMouseMove
        document.onmousedown = onMouseDown
        document.onmouseup = onMouseUp
      /*} else {
        document.onmousemove = null
        document.onmousedown = null
        document.onmouseup = null
      }*/
    }

    document.addEventListener('pointerlockchange', onPointerLockChange, false)
    document.addEventListener('mozpointerlockchange', onPointerLockChange, false)

    document.onkeydown = e => {
      Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().keyDownListener(e)
    }

    document.onkeyup = e => {
      Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().keyUpListener(e)
    }

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })

    let lastTimestamp

    document.addEventListener('mousewheel', e => {
      if (e.timeStamp - lastTimestamp < 1) return
      lastTimestamp = e.timeStamp
      const localPlayer = Vokkit.getClient().getLocalPlayer()
      const UIManager = Vokkit.getClient().getUIManager()
      if (e.deltaY > 0) {
        // 아래로 스크롤 - 오른쪽으로 이동
        const selectedSlotId = localPlayer.getSelectedSlotId()
        if (selectedSlotId == 8) localPlayer.setSelectedSlotId(0)
        else localPlayer.setSelectedSlotId(selectedSlotId + 1)
        UIManager.updateCrossbarSelected()
      } else if (e.deltaY < 0) {
        // 위로 스크롤 - 왼쪽으로 이동
        const selectedSlotId = localPlayer.getSelectedSlotId()
        if (selectedSlotId == 0) localPlayer.setSelectedSlotId(8)
        else localPlayer.setSelectedSlotId(selectedSlotId - 1)
        UIManager.updateCrossbarSelected()
      }
    })

    this.coolDown = 0
  }
}

module.exports = InputManager
