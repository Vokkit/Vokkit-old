global.THREE = require('../node_modules/three/build/three')
global.THREE.Cache.enabled = true
global.Vokkit = require('./src/Vokkit.js')
window.onload = function () {
  Vokkit.init()
}
