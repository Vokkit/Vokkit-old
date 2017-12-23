global.THREE = require('../node_modules/three/build/three')
global.Vokkit = require('./src/Vokkit.js')
global.THREE.Cache.enabled = true
window.onload = function () {
  Vokkit.init()
}
