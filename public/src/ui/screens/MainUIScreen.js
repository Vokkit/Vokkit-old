const Screen = require('../Screen.js')
const InputBinder = require('../InputBinder.js')

class MainUIScreen extends Screen {
  constructor () {
    super('MainUIScreen', 'stack', new InputBinder())

    this.init()
    this.initInput()
  }

  init () {
    this.dom.innerHTML = (
      '<div id="cross" style="position:fixed; left:50%; top:50%; width:32px; height:32px; margin:-16px 0px 0px -16px;display:none">' +
        '<img src="./assets/gui/cross.png"></img>' +
      '</div>' +

      '<div id="crossbar" style="position: fixed; left: 31.8%; bottom: 0%; width: 36.4vw; display: none">' +
        '<img src="./assets/gui/crossbar.png" style="width: 36.4vw;"></img>' +
      '</div>' +

      '<div id="crossbar_selected" style="position: fixed; left: calc(31.8% - 0.2vw); bottom: -0.2vw; width: 4.8vw; display: none">' +
        '<img src="./assets/gui/crossbar_selected.png" style="width: 4.8vw;"></img>' +
      '</div>'
    )
  }

  initInput () {
    const MainScreen = Vokkit.getClient().getScreenManager().getScreen('MainScreen')
    let renderer = MainScreen.getRenderer()

    renderer.domElement.requestPointerLock = (
      renderer.domElement.requestPointerLock ||
      renderer.domElement.mozRequestPointerLock
    )

    renderer.domElement.onclick = function (e) {
      renderer.domElement.requestPointerLock()
    }

    this.inputBinder.setMouseMoveListener(event => {
      var location = Vokkit.getClient().getLocalPlayer().getLocation()

      location.setYaw(location.getYaw() + event.movementX / 1000)
      location.setPitch(location.getPitch() - event.movementY / 1000)
      Vokkit.getClient().getLocalPlayer().teleport(location)
      MainScreen.updateGroup(location)
    })

    this.inputBinder.setMouseDownListener(event => {
      if (event.button === 0 || event.button === undefined) {
        MainScreen.press[6] = true
      } else if (event.button === 1) {
        // 선택된 블럭을 인벤토리에 넣음. TODO
      } else if (event.button === 2) {
        MainScreen.press[7] = true
      }
    })

    this.inputBinder.setMouseUpListener(event => {
      if (event.button === 0 || event.button === undefined) {
        MainScreen.press[6] = false
      } else if (event.button === 2) {
        MainScreen.press[7] = false
      }
    })

    this.inputBinder.setKeyDownListener(event => {
      if (event.keyCode === 87) { // w
        MainScreen.press[0] = true
      } else if (event.keyCode === 83) { // s
        MainScreen.press[1] = true
      } else if (event.keyCode === 65) { // a
        MainScreen.press[2] = true
      } else if (event.keyCode === 68) { // d
        MainScreen.press[3] = true
      } else if (event.keyCode === 32) { // space
        MainScreen.press[4] = true
      } else if (event.keyCode === 16) { // shift
        MainScreen.press[5] = true
      } else if (event.keyCode >= 49 && event.keyCode <= 57) { // 1 ~ 9
        Vokkit.getClient().getLocalPlayer().setSelectedSlotId(event.keyCode - 49)
        Vokkit.getClient().getUIManager().updateCrossbarSelected()
      }
      if (event.keyCode === 84) {
        Vokkit.getClient().getScreenManager().addScreen('ChatScreen')
      } else if (event.keyCode === 9) {
        alert('test')
      }
    })

    this.inputBinder.setkeyUpListener(event => {
      if (event.keyCode === 87) {
        MainScreen.press[0] = false
      } else if (event.keyCode === 83) {
        MainScreen.press[1] = false
      } else if (event.keyCode === 65) {
        MainScreen.press[2] = false
      } else if (event.keyCode === 68) {
        MainScreen.press[3] = false
      } else if (event.keyCode === 32) {
        MainScreen.press[4] = false
      } else if (event.keyCode === 16) {
        MainScreen.press[5] = false
      }
    })

    let lastTimestamp
    this.inputBinder.setMouseWheelListener(event => {
      if (event.timeStamp - lastTimestamp < 1) return
      lastTimestamp = event.timeStamp
      const localPlayer = Vokkit.getClient().getLocalPlayer()
      const UIManager = Vokkit.getClient().getUIManager()
      if (event.deltaY > 0) {
        // 아래로 스크롤 - 오른쪽으로 이동
        const selectedSlotId = localPlayer.getSelectedSlotId()
        if (selectedSlotId == 8) localPlayer.setSelectedSlotId(0)
        else localPlayer.setSelectedSlotId(selectedSlotId + 1)
        UIManager.updateCrossbarSelected()
      } else if (event.deltaY < 0) {
        // 위로 스크롤 - 왼쪽으로 이동
        const selectedSlotId = localPlayer.getSelectedSlotId()
        if (selectedSlotId == 0) localPlayer.setSelectedSlotId(8)
        else localPlayer.setSelectedSlotId(selectedSlotId - 1)
        UIManager.updateCrossbarSelected()
      }
    })
  }
}

module.exports = MainUIScreen
