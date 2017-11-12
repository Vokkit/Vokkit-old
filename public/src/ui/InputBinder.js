class InputBinder {
  constructor () {
    this.keyDownListener = event => {}
    this.keyUpListener = event => {}

    this.mouseDownListener = event => {}
    this.mouseUpListener = event => {}
    this.mouseMoveListener = event => {}

    this.touchDownListener = event => {}
    this.touchUpListener = event => {}
    this.touchMoveListener = event => {}
    this.touchCancelListener = event => {}
  }

  // set
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

  setTouchDownListener (listener) {
    this.touchDownListener = listener
  }

  setTouchMoveListener (listener) {
    this.touchMoveListener = listener
  }

  setTouchCancelListener (listener) {
    this.touchCancelListener = listener
  }

  setTouchUpListener (listener) {
    this.touchUpListener = listener
  }

  // get
  getKeyDownListener () {
    return this.keyDownListener
  }

  getkeyUpListener () {
    return this.keyUpListener
  }

  getMouseDownListener () {
    return this.mouseDownListener
  }

  getMouseMoveListener () {
    return this.mouseMoveListener
  }

  getMouseUpListener () {
    return this.mouseUpListener
  }

  getTouchDownListener () {
    return this.touchDownListener
  }

  getTouchMoveListener () {
    return this.touchMoveListener
  }

  getTouchCancelListener () {
    return this.touchCancelListener
  }

  getTouchUpListener () {
    return this.touchUpListener
  }
}

module.exports = InputBinder
