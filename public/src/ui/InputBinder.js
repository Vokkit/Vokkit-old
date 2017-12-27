class InputBinder {
  constructor () {
    this.keyDownListener = event => {}
    this.keyUpListener = event => {}

    this.mouseDownListener = event => {}
    this.mouseUpListener = event => {}
    this.mouseMoveListener = event => {}
    this.mouseWheelListener = event => {}

    this.pointerLockListener = event => {}
    this.pointerUnlockListener = event => {}

    this.disableCursor = false
  }

  setKeyDownListener (listener) {
    this.keyDownListener = listener
  }

  setkeyUpListener (listener) {
    this.keyUpListener = listener
  }

  setMouseDownListener (listener) {
    this.mouseDownListener = listener
  }

  setMouseMoveListener (listener) {
    this.mouseMoveListener = listener
  }

  setMouseUpListener (listener) {
    this.mouseUpListener = listener
  }

  setMouseWheelListener (listener) {
    this.mouseWheelListener = listener
  }

  setPointerLockListener (listener) {
    this.pointerLockListener = listener
  }

  setPointerUnlockListener (listener) {
    this.pointerUnlockListener = listener
  }
}

module.exports = InputBinder
