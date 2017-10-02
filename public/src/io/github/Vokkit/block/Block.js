class Block{
    constructor(position, id) {
        this.position = position;
        this.id = id;
    }

    getPosition() {
        return this.position.clone();
    }

    getId() {
        return this.id;
    }

    setId(id) {
        this.id = id;
    }
}

module.exports = Block;