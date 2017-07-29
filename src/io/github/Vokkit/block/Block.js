function Block(position, id){
    this.position = position.clone();
    this.id = id;
    this.setId = function(id){
        this.id = id;
    }
}

module.exports = Block;