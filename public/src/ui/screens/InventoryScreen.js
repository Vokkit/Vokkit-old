const Screen = require('../Screen.js')
const InputBinder = require('../InputBinder.js')

class InventoryScreen extends Screen {
  constructor () {
    super('InventoryScreen', 'stack', new InputBinder())

    /*
    0 hotbar
    1 2 3 Inventory
    4 armors
    */

    this.slot = []
    for (let i = 0; i < 5; i++) {
      this.slot[i] = []
    }

    this.init()
    this.initInput()
  }

  init () {
    this.dom.innerHTML = (
      '<div id="inventory-back" style="width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.5);">' +
        '<div id="inventory-panel" class="background-panel" style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%)">' +
          '<div id="player-slot" style="width: 100%; height: calc(48px * 4)">' +
            '<div id="armor-slot" style="float: left;">' +
              '<div id="armor-1" class="item-cell" style="width: 36px; height: 36px;">' +
                '<img src="./assets/gui/empty_armor_slot_helmet.png" style="width: 100%; height: 100%;">' +
              '</div>' +
              '<div id="armor-2" class="item-cell" style="width: 36px; height: 36px;">' +
                '<img src="./assets/gui/empty_armor_slot_chestplate.png" style="width: 100%; height: 100%;">' +
              '</div>' +
              '<div id="armor-3" class="item-cell" style="width: 36px; height: 36px;">' +
                '<img src="./assets/gui/empty_armor_slot_leggings.png" style="width: 100%; height: 100%;">' +
              '</div>' +
              '<div id="armor-4" class="item-cell" style="width: 36px; height: 36px;">' +
                '<img src="./assets/gui/empty_armor_slot_boots.png" style="width: 100%; height: 100%;">' +
              '</div>' +
            '</div>' +
            '<div id="player-preview" style="float: left; background-color: #000000; width: calc(48px * 3); height: calc(48px * 4)"></div>' +
            '<div id="shield" class="item-cell" style="float: left; margin-top: calc(48px * 3); width: 36px; height: 36px;">' +
              '<img src="./assets/gui/empty_armor_slot_shield.png" style="width: 100%; height: 100%;">' +
            '</div>' +
            '<div id="craft-slot" style="float: left;">' +
              '<div id="crafting" style="float: left; margin-top: 36px;">' +
                '<div id="craft-line-1" style="height: 48px;">' +
                  '<div id="craft-1-1" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
                  '<div id="craft-1-2" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
                '</div>' +
                '<div id="craft-line-2" style="height: 48px;">' +
                  '<div id="craft-2-1" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
                  '<div id="craft-2-2" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
                '</div>' +
              '</div>' +
              '<img src="./assets/gui/arrow.png" style="float: left; margin-top: 60px; width: 36px; height: 36px; padding: 6px;"></img>' +
              '<div class="item-cell" style="float: left; margin-top: 60px; width: 36px; height: 36px;"></div>' +
            '</div>' +
          '</div>' +
          '<div id="line-1" style="width: 100%; height: 48px; margin-top: 16px;">' +
            '<div id="slot-1-1" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-1-2" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-1-3" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-1-4" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-1-5" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-1-6" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-1-7" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-1-8" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-1-9" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
          '</div>' +
          '<div id="line-2" style="width: 100%; height: 48px;">' +
            '<div id="slot-2-1" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-2-2" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-2-3" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-2-4" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-2-5" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-2-6" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-2-7" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-2-8" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-2-9" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
          '</div>' +
          '<div id="line-3" style="width: 100%; height: 48px;">' +
            '<div id="slot-3-1" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-3-2" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-3-3" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-3-4" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-3-5" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-3-6" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-3-7" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-3-8" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-3-9" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
          '</div>' +
          '<div id="line-hotbar" style="width: 100%; height: 48px; margin-top: 8px;">' +
            '<div id="slot-0-1" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-0-2" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-0-3" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-0-4" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-0-5" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-0-6" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-0-7" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-0-8" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
            '<div id="slot-0-9" class="item-cell" style="width: 36px; height: 36px; float: left;"></div>' +
          '</div>' +
        '</div>' +
      '</div>'
    )
  }

  initInput () {
    this.inputBinder.setKeyDownListener(event => {
    switch (event.keyCode) {
      case 27: case 69: // esc e
        Vokkit.getClient().getScreenManager().getScreenChooser().popScreen()

        const MainScreen = Vokkit.getClient().getScreenManager().getScreen('MainScreen')
        MainScreen.dom.requestPointerLock()
        break
      }
    })
  }

  syncInventory () {
    if (this.slot[0][0] == null) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 9; j++) {
          this.slot[i][j] = document.getElementById(`slot-${i}-${j}`)
        }
      }
      for (let i = 0; i < 4; i++) {
        this.slot[5][i] = document.getElementById(`armor-${i}`)
      }
      this.slot[5][4] = document.getElementById('shield')
    }

    const inventory = Vokkit.getClient().getLocalPlayer().getInventory()
    const contents = inventory.getContents()

    // TODO
  }
}

module.exports = InventoryScreen