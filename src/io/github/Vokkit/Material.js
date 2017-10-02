class Material {
  constructor (id) {
    this.id = id
  }

  equals (material) {
    return this.id === material.id
  }

  getName () {
    for (let i in Materials) {
      if (this.equals(Materials[i])) {
        return i.toLowerCase()
      }
    }
  }
}

let MaterialAPI = {}
let Materials = {}
let MaterialModule = {}

MaterialAPI.get = function (name) {
  if (!isNaN(name)) {
    for (let i in Materials) {
      if (Materials[i].id === name) {
        return Materials[i]
      }
    }
  }
  return Materials[name]
}

Materials.AIR = new Material(0)
Materials.STONE = new Material(1)
Materials.GRASS = new Material(2)
Materials.DIRT = new Material(3)

MaterialModule = Object.assign(Materials, MaterialAPI)

module.exports = MaterialModule
