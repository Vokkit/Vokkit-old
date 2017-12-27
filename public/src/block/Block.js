/*
 * This block class is REAL WORLD BLOCK, there is block data class in blocks folder
 */
 class Block {
   constructor (position, id) {
     this.position = position
     this.id = id
   }

   getPosition () {
     return this.position.clone()
   }

   setPosition (position) {
     this.position = position
   }

   getId () {
     return this.id
   }

   setId (id) {
     this.id = id
   }
 }

 module.exports = Block
