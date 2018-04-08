global.THREE = require('../node_modules/three/build/three')
global.Vokkit = require('./src/Vokkit.js')
global.BlockList = require('./src/block/BlockList.js')
global.THREE.Cache.enabled = true
window.onload = function () {
  Vokkit.init()
}
