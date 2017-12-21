class InputManager {
  showCursor () {
    document.exitPointerLock()
  }

  dismissCursor () {
    document.body.requestPointerLock() // Not work
  }

  setInput () {
    function onMouseMove (e) {
      Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().mouseMoveListener(e)
    }

    function onMouseDown (e) {
      Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().mouseDownListener(e)
    }

    function onMouseUp (e) {
      Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().mouseUpListener(e)
    }

    function onMouseWheel (e) {
      Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().mouseWheelListener(e)
    }

    function onKeyDown (e) {
      Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().keyDownListener(e)
    }

    function onKeyUp (e) {
      Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().keyUpListener(e)
    }

    function onPointerLockChange (event) {
      if (document.pointerLockElement !== null && document.mozPointerLockElement !== null) {
        document.onmousemove = onMouseMove
        document.onmousedown = onMouseDown
        document.onmouseup = onMouseUp
        document.onwheel = onMouseWheel
        document.onkeydown = onKeyDown
        document.onkeyup = onKeyUp

        Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().pointerLockListener()
      } else if (Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().disableCursor) {
        document.onmousemove = null
        document.onmousedown = null
        document.onmouseup = null
        document.onwheel = null
        document.onkeydown = null
        document.onkeyup = null

        Vokkit.getClient().getScreenManager().getNowScreen().getInputBinder().pointerUnlockListener()
      }
    }

    document.addEventListener('pointerlockchange', onPointerLockChange, false)
    document.addEventListener('mozpointerlockchange', onPointerLockChange, false)

    document.addEventListener('contextmenu', (e) => {
      e.preventDefault()
    })
  }
}

module.exports = InputManager
