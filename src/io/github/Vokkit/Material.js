function Material(id) {
    this.id = id;

    this.equals = function(material){
        return material.id === this.id;
    }

    this.getName = function() {
        for (var i in Materials) {
            if (this.equals(Materials[i])) {
                return i.toLowerCase();
            }
        }
    }
}

var MaterialAPI = {};
var Materials = {};
var MaterialModule = {};

MaterialAPI.get = function(name){
    if (!isNaN(name)) {
        for (var i in Materials) {
            if (Materials[i].id == name) {
                return Materials[i];
            }
        }
    }
    return Materials[name];
}

Materials.AIR = new Material(0);
Materials.STONE = new Material(1);
Materials.GRASS = new Material(2);
Materials.DIRT = new Material(3);

for (var i in MaterialAPI) {
    MaterialModule[i] = MaterialAPI[i];
}

for (var i in Materials) {
    MaterialModule[i] = Materials[i];
}

module.exports = MaterialModule;