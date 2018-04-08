const Screen = require('../Screen.js')
const InputBinder = require('../InputBinder.js')

class InventoryScreen extends Screen {
  constructor(inventory) {
    super('InventoryScreen', 'stack', new InputBinder())

    /*
    0 hotbar
    1 2 3 Inventory
    4 armors
    */

    this.slot = []
    for (let i = 0; i < 6; i++) {
      this.slot[i] = []
    }

    this.init()
    this.initInput()
  }

  init() {
    this.dom.innerHTML = (
      '<div id="inventory-back" style="width: 100vw; height: 100vh; background-color: rgba(0, 0, 0, 0.5);">' +
      '<div id="inventory-panel" class="background-panel" style="position:absolute; width: calc(34.8vw - 2.4vw); height: calc(32.2vw - 2.4vw); top: calc(50vh - 16.1vw); left: 32.6vw">' +
      '<div id="player-slot" style="width: 100%; height: calc(3.6vw * 4)">' +
      '<div id="armor-slot" style="float: left;">' +
      '<div id="armor-1" class="item-cell">' +
      '<img src="./assets/gui/empty_armor_slot_helmet.png" style="width: 3.2vw; height: 3.2vw;">' +
      '</div>' +
      '<div id="armor-2" class="item-cell">' +
      '<img src="./assets/gui/empty_armor_slot_chestplate.png" style="width: 3.2vw; height: 3.2vw;">' +
      '</div>' +
      '<div id="armor-3" class="item-cell">' +
      '<img src="./assets/gui/empty_armor_slot_leggings.png" style="width: 3.2vw; height: 3.2vw;">' +
      '</div>' +
      '<div id="armor-4" class="item-cell">' +
      '<img src="./assets/gui/empty_armor_slot_boots.png" style="width: 3.2vw; height: 3.2vw;">' +
      '</div>' +
      '</div>' +
      '<div id="player-preview" class="player-preview" style="float: left; background-color: #000000; width: calc(3.6vw * 3 - 1vw - 0.4vw); height: calc(3.6vw * 4 - 0.4vw)"></div>' +
      '<div id="shield" class="item-cell" style="float: left; margin-top: calc(3.6vw * 3);">' +
      '<img src="./assets/gui/empty_armor_slot_shield.png" style="width: 3.2vw; height: 3.2vw;">' +
      '</div>' +
      '<div id="craft-slot" style="float: left;">' +
      '<div id="crafting" style="float: left; margin-top: 2vw;">' +
      '<div id="craft-line-1" style="height: 3.6vw;">' +
      '<div id="craft-1-1" class="item-cell" style="float: left;"></div>' +
      '<div id="craft-1-2" class="item-cell" style="float: left;"></div>' +
      '</div>' +
      '<div id="craft-line-2" style="height: 3.6vw;">' +
      '<div id="craft-2-1" class="item-cell" style="float: left;"></div>' +
      '<div id="craft-2-2" class="item-cell" style="float: left;"></div>' +
      '</div>' +
      '</div>' +
      '<img src="./assets/gui/arrow.png" style="float: left; width: 3.6vw; height: 3.6vw; margin-top: 3.4vw; padding: 0.4vw;"></img>' +
      '<div class="item-cell" style="float: left; margin-top: 3.8vw;"></div>' +
      '</div>' +
      '</div>' +
      '<div id="line-1" style="width: 100%; height: 3.6vw; margin-top: 0.8vw;">' +
      '<div id="slot-1-1" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-1-2" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-1-3" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-1-4" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-1-5" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-1-6" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-1-7" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-1-8" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-1-9" class="item-cell" style="float: left;"></div>' +
      '</div>' +
      '<div id="line-2" style="width: 100%; height: 3.6vw;">' +
      '<div id="slot-2-1" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-2-2" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-2-3" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-2-4" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-2-5" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-2-6" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-2-7" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-2-8" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-2-9" class="item-cell" style="float: left;"></div>' +
      '</div>' +
      '<div id="line-3" style="width: 100%; height: 3.6vw;">' +
      '<div id="slot-3-1" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-3-2" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-3-3" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-3-4" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-3-5" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-3-6" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-3-7" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-3-8" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-3-9" class="item-cell" style="float: left;"></div>' +
      '</div>' +
      '<div id="line-hotbar" style="width: 100%; height: 3.6vw; margin-top: 0.6vw;">' +
      '<div id="slot-0-1" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-0-2" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-0-3" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-0-4" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-0-5" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-0-6" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-0-7" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-0-8" class="item-cell" style="float: left;"></div>' +
      '<div id="slot-0-9" class="item-cell" style="float: left;"></div>' +
      '</div>' +
      '</div>' +
      '</div>'
    )
  }

  initInput() {
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

  syncInventory() {
    if (this.slot[0][0] == null) {
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 9; j++) {
          this.slot[i][j] = document.getElementById(`slot-${i}-${j + 1}`)
        }
      }
      for (let i = 0; i < 4; i++) {
        this.slot[5][i] = document.getElementById(`armor-${i + 1}`)
      }
      this.slot[5][4] = document.getElementById('shield')
    }

    const inventory = Vokkit.getClient().getLocalPlayer().getInventory()
    const contents = inventory.getContents()

    for (let i in contents) {
      const item = contents[i]
      const block = BlockList.get(item.getId(), item.getData())

      if (block == null || item.getId() === 0) {
        continue
      }
      let amount = item.getAmount()
      if (amount === 1) {
        amount = ''
      }
      const html = `<img style="position: relative; width: 3.2vw; height: 3.2vw;" src="${block.preview}"></img>` +
        `<div style="position: absolute; margin-top: -1.3vw; font-size: 1vw; margin-left: 1.5vw; color: #4d4d4d;">${amount}</div>` +
        `<div style="position: absolute; margin-top: -1.4vw; font-size: 1vw; margin-left: 1.4vw; color: #ffffff;">${amount}</div>`

      document.getElementById(`slot-${Math.ceil(i / 9)}-${i % 9 + 1}`).innerHTML = html
    }
  }
}

module.exports = InventoryScreen
