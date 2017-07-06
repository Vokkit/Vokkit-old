function Block(position, id){
    this.position = position;
    this.id = id;
    this.setId = function(id){
        this.id = id;
    }
}

module.exports = Block;