class Renderer {
  constructor (skinPath) {
    this.skinPath = skinPath
    if (typeof skinPath === 'string') {
      const textureLoader = new THREE.TextureLoader()
      this.texture = textureLoader.load(`/assets/${skinPath}`)
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
        if (world.getBlock(mesh.geometry.vertices[vertexIndex].clone().add(vector)).getId() !== 0 && world.getBlock(mesh.geometry.vertices[vertexIndex].clone().add(vector)).getId() != null) {
          return true
        }
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
    let xCollision = 0
    let yCollision = 0
    let zCollision = 0

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
        if (this.checkMeshCollision(meshes, world)) {
          if (x > 0) xCollision = -1
          else xCollision = 1
          xFinish = true
          x = previousX
          velocity.x = 0
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
        if (this.checkMeshCollision(meshes, world)) {
          if (y > 0) yCollision = -1
          else yCollision = 1
          yFinish = true
          y = previousY
          velocity.y = 0
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
        if (this.checkMeshCollision(meshes, world)) {
          if (z > 0) zCollision = -1
          else zCollision = 1
          zFinish = true
          z = previousZ
          velocity.z = 0
        }
        for (const i in meshes) meshes[i].position.copy(originalPositions[i])
        add.set(0, 0, 0)
      }
    }

    return {xCollision, yCollision, zCollision, x, y, z}
  }
}

module.exports = Renderer
