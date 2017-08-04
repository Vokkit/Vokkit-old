function Block(position, id){
    if (Array.isArray(position)) {
        this.position = new THREE.Vector3(position[0], position[1], position[2]);
    } else {
        this.position = position.clone();
    }
    this.id = id;
    this.setId = function(id){
        this.id = id;
    }
}

module.exports = Block;