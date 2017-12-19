class Renderer {
  constructor (skinPath) {
    this.skinPath = skinPath
    if (typeof skinPath === 'string') {
      const textureLoader = new THREE.TextureLoader()
      this.texture = textureLoader.load(`/assets/skins/${skinPath}.png`)
      this.texture.magFilter = THREE.NearestFilter
      this.texture.minFilter = THREE.LinearMipMapLinearFilter
      this.material = new THREE.MeshBasicMaterial({
        map: this.texture,
        overdraw: true
      })
    }
  }

  checkMeshCollision (meshes, world) {
    for (const i in meshes) {
      const mesh = meshes[i]
      const vector = mesh.position.clone()
      for (let vertexIndex = 0; vertexIndex < mesh.geometry.vertices.length; vertexIndex++) {
        const id = world.getBlock(mesh.geometry.vertices[vertexIndex].clone().add(vector)).getId()
        if (id !== 0 && id != null) return true
      }
    }
    return false
  }

  checkMove (location, velocity, meshes, world) {
    const originalPositions = []
    for (const i in meshes) {
      originalPositions[i] = meshes[i].position.clone()
    }
    const add = new THREE.Vector3()
    let x = 0
    let y = 0
    let z = 0
    let xFinish = velocity.x === 0
    let yFinish = velocity.y === 0
    let zFinish = velocity.z === 0
    let xCollision = false
    let yCollision = false
    let zCollision = false
    while (!(xFinish && yFinish && zFinish)) {
      if (!xFinish) {
        const previousX = x
        if (velocity.x > 0) {
          if (x < velocity.x - 0.25) x += 0.25
          else if (x < velocity.x) {
            x = velocity.x
            xFinish = true
          }
        }

        if (velocity.x < 0) {
          if (x > velocity.x + 0.25) x -= 0.25
          else if (x > velocity.x) {
            x = velocity.x
            xFinish = true
          }
        }
        add.set(x, y, z)

        for (const i in meshes) meshes[i].position.add(add)
        if (this.checkMeshCollision(meshes, world)) { // collision
          xFinish = true
          x = previousX
          velocity.x = 0
          xCollision = true
        }
        for (const i in meshes) meshes[i].position.copy(originalPositions[i])
        add.set(0, 0, 0)
      }

      if (!yFinish) {
        const previousY = y
        if (velocity.y > 0) {
          if (y < velocity.y - 0.25) y += 0.25
          else if (y < velocity.y) {
            y = velocity.y
            yFinish = true
          }
        }

        if (velocity.y < 0) {
          if (y > velocity.y + 0.25) y -= 0.25
          else if (y > velocity.y) {
            y = velocity.y
            yFinish = true
          }
        }
        add.set(x, y, z)
        for (const i in meshes) meshes[i].position.add(add)
        if (this.checkMeshCollision(meshes, world)) { // collision
          yFinish = true
          y = previousY
          velocity.y = 0
          yCollision = true
        }
        for (const i in meshes) meshes[i].position.copy(originalPositions[i])
        add.set(0, 0, 0)
      }

      if (!zFinish) {
        const previousZ = z
        if (velocity.z > 0) {
          if (z < velocity.z - 0.25) z += 0.25
          else if (z < velocity.z) {
            z = velocity.z
            zFinish = true
          }
        }

        if (velocity.z < 0) {
          if (z > velocity.z + 0.25) z -= 0.25
          else if (z > velocity.z) {
            z = velocity.z
            zFinish = true
          }
        }
        add.set(x, y, z)
        for (const i in meshes) meshes[i].position.add(add)
        if (this.checkMeshCollision(meshes, world)) { // collision
          zFinish = true
          z = previousZ
          velocity.z = 0
          zCollision = true
        }
        for (const i in meshes) meshes[i].position.copy(originalPositions[i])
        add.set(0, 0, 0)
      }
    }
    
    return {xCollision, yCollision, zCollision, x, y, z}
  }
}

module.exports = Renderer
