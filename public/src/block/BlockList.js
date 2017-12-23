let BlockList = function () {}

let list = [
  new (require('./blocks/BlockAir.js'))(),
  new (require('./blocks/BlockStone.js'))(),
  new (require('./blocks/BlockGrass.js'))(),
  new (require('./blocks/BlockDirt.js'))(),
  new (require('./blocks/BlockCobblestone.js'))(),
  new (require('./blocks/BlockPlanks.js'))(),
  new (require('./blocks/BlockTest.js'))(),
  new (require('./blocks/BlockBedrock.js'))(),
]

list = list.map(e => {
  return {
    id: e.getId(),
    data: e.getData(),
    value: e
  }

  BlockList[e.getName().upperCase()] = e.getId()
})

BlockList.get = function (id, data = 0) {
  for (const e of list) {
    if (e.id === id && e.data === data) {
      return e.value
    }
  }
}

module.exports = BlockList
