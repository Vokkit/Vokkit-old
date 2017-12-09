class Material {
  constructor (id) {
    this.id = id
  }

  equals (material) {
    return material.id === this.id || material === this.id
  }

  getName () {
    for (var i in Materials) {
      if (this.equals(Materials[i])) {
        return i.toLowerCase()
      }
    }
  }
}

const Materials = {
  AIR: new Material(0),
  STONE: new Material(1),
  GRASS: new Material(2),
  DIRT: new Material(3)
}
const MaterialModule = {}

const MaterialAPI = {
  get (name) {
    if (!isNaN(name)) {
      for (var i in Materials) {
        if (Materials[i].id === name) {
          return Materials[i]
        }
      }
    }
    return Materials[name]
  }
}

for (const i in MaterialAPI) {
  MaterialModule[i] = MaterialAPI[i]
}

for (const i in Materials) {
  MaterialModule[i] = Materials[i]
}

module.exports = MaterialModule
