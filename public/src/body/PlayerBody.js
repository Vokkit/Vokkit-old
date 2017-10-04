var Body = require('./Body.js')
//	Height: 1.8 Blocks

var notRender

function PlayerBody (skinPath, player) {
  this.name = player.getName()
  Body.call(this, skinPath)
  this.width = 0.6
  this.height = 1.8
  this.depth = 0.225
  this.player = player
  this.bodyYaw
  this.bodyPitch
    // 스킨 한 픽셀당 0.05625 칸
  this.headGeometry = new THREE.BoxGeometry(0.45, 0.45, 0.45)

  var headUvs0 = [new THREE.Vector2(0.125, 0.75), new THREE.Vector2(0.125, 0.5), new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.25, 0.75)]
  var headUvs1 = [new THREE.Vector2(0, 0.75), new THREE.Vector2(0, 0.5), new THREE.Vector2(0.125, 0.5), new THREE.Vector2(0.125, 0.75)]
  var headUvs2 = [new THREE.Vector2(0.25, 0.75), new THREE.Vector2(0.25, 0.5), new THREE.Vector2(0.375, 0.5), new THREE.Vector2(0.375, 0.75)]
  var headUvs3 = [new THREE.Vector2(0.375, 0.75), new THREE.Vector2(0.375, 0.5), new THREE.Vector2(0.5, 0.5), new THREE.Vector2(0.5, 0.75)]
  var headUvs4 = [new THREE.Vector2(0.125, 1), new THREE.Vector2(0.125, 0.75), new THREE.Vector2(0.25, 0.75), new THREE.Vector2(0.25, 1)]
  var headUvs5 = [new THREE.Vector2(0.25, 1), new THREE.Vector2(0.25, 0.75), new THREE.Vector2(0.375, 0.75), new THREE.Vector2(0.375, 1)]

  this.headGeometry.faceVertexUvs[0][8] = [headUvs0[0], headUvs0[1], headUvs0[3]]
  this.headGeometry.faceVertexUvs[0][9] = [headUvs0[1], headUvs0[2], headUvs0[3]]
  this.headGeometry.faceVertexUvs[0][2] = [headUvs1[0], headUvs1[1], headUvs1[3]]
  this.headGeometry.faceVertexUvs[0][3] = [headUvs1[1], headUvs1[2], headUvs1[3]]
  this.headGeometry.faceVertexUvs[0][0] = [headUvs2[0], headUvs2[1], headUvs2[3]]
  this.headGeometry.faceVertexUvs[0][1] = [headUvs2[1], headUvs2[2], headUvs2[3]]
  this.headGeometry.faceVertexUvs[0][10] = [headUvs3[0], headUvs3[1], headUvs3[3]]
  this.headGeometry.faceVertexUvs[0][11] = [headUvs3[1], headUvs3[2], headUvs3[3]]
  this.headGeometry.faceVertexUvs[0][4] = [headUvs4[0], headUvs4[1], headUvs4[3]]
  this.headGeometry.faceVertexUvs[0][5] = [headUvs4[1], headUvs4[2], headUvs4[3]]
  this.headGeometry.faceVertexUvs[0][6] = [headUvs5[0], headUvs5[1], headUvs5[3]]
  this.headGeometry.faceVertexUvs[0][7] = [headUvs5[1], headUvs5[2], headUvs5[3]]

  this.bodyGeometry = new THREE.BoxGeometry(0.45, 0.675, 0.225)

  var bodyUvs0 = [new THREE.Vector2(0.3125, 0.375), new THREE.Vector2(0.3125, 0), new THREE.Vector2(0.4375, 0), new THREE.Vector2(0.4375, 0.375)]
  var bodyUvs1 = [new THREE.Vector2(0.25, 0.375), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.3125, 0), new THREE.Vector2(0.3125, 0.375)]
  var bodyUvs2 = [new THREE.Vector2(0.4375, 0.375), new THREE.Vector2(0.4375, 0), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.5, 0.375)]
  var bodyUvs3 = [new THREE.Vector2(0.5, 0.375), new THREE.Vector2(0.5, 0), new THREE.Vector2(0.625, 0), new THREE.Vector2(0.625, 0.375)]
  var bodyUvs4 = [new THREE.Vector2(0.3125, 0.5), new THREE.Vector2(0.3125, 0.375), new THREE.Vector2(0.4375, 0.375), new THREE.Vector2(0.4375, 0.5)]
  var bodyUvs5 = [new THREE.Vector2(0.4375, 0.5), new THREE.Vector2(0.4375, 0.375), new THREE.Vector2(0.5625, 0.375), new THREE.Vector2(0.5625, 0.5)]

  this.bodyGeometry.faceVertexUvs[0][8] = [bodyUvs0[0], bodyUvs0[1], bodyUvs0[3]]
  this.bodyGeometry.faceVertexUvs[0][9] = [bodyUvs0[1], bodyUvs0[2], bodyUvs0[3]]
  this.bodyGeometry.faceVertexUvs[0][2] = [bodyUvs1[0], bodyUvs1[1], bodyUvs1[3]]
  this.bodyGeometry.faceVertexUvs[0][3] = [bodyUvs1[1], bodyUvs1[2], bodyUvs1[3]]
  this.bodyGeometry.faceVertexUvs[0][0] = [bodyUvs2[0], bodyUvs2[1], bodyUvs2[3]]
  this.bodyGeometry.faceVertexUvs[0][1] = [bodyUvs2[1], bodyUvs2[2], bodyUvs2[3]]
  this.bodyGeometry.faceVertexUvs[0][10] = [bodyUvs3[0], bodyUvs3[1], bodyUvs3[3]]
  this.bodyGeometry.faceVertexUvs[0][11] = [bodyUvs3[1], bodyUvs3[2], bodyUvs3[3]]
  this.bodyGeometry.faceVertexUvs[0][4] = [bodyUvs4[0], bodyUvs4[1], bodyUvs4[3]]
  this.bodyGeometry.faceVertexUvs[0][5] = [bodyUvs4[1], bodyUvs4[2], bodyUvs4[3]]
  this.bodyGeometry.faceVertexUvs[0][6] = [bodyUvs5[0], bodyUvs5[1], bodyUvs5[3]]
  this.bodyGeometry.faceVertexUvs[0][7] = [bodyUvs5[1], bodyUvs5[2], bodyUvs5[3]]

  this.rightArmGeometry = new THREE.BoxGeometry(0.225, 0.675, 0.225)

  var rightArmUvs0 = [new THREE.Vector2(0.6875, 0.375), new THREE.Vector2(0.6875, 0), new THREE.Vector2(0.75, 0), new THREE.Vector2(0.75, 0.375)]
  var rightArmUvs1 = [new THREE.Vector2(0.625, 0.375), new THREE.Vector2(0.625, 0), new THREE.Vector2(0.6875, 0), new THREE.Vector2(0.6875, 0.375)]
  var rightArmUvs2 = [new THREE.Vector2(0.75, 0.375), new THREE.Vector2(0.75, 0), new THREE.Vector2(0.8125, 0), new THREE.Vector2(0.8125, 0.375)]
  var rightArmUvs3 = [new THREE.Vector2(0.8125, 0.375), new THREE.Vector2(0.8125, 0), new THREE.Vector2(0.875, 0), new THREE.Vector2(0.875, 0.375)]
  var rightArmUvs4 = [new THREE.Vector2(0.6875, 0.5), new THREE.Vector2(0.6875, 0.375), new THREE.Vector2(0.75, 0.375), new THREE.Vector2(0.75, 0.5)]
  var rightArmUvs5 = [new THREE.Vector2(0.75, 0.5), new THREE.Vector2(0.75, 0.375), new THREE.Vector2(0.8125, 0.375), new THREE.Vector2(0.8125, 0.5)]

  this.rightArmGeometry.faceVertexUvs[0][8] = [rightArmUvs0[0], rightArmUvs0[1], rightArmUvs0[3]]
  this.rightArmGeometry.faceVertexUvs[0][9] = [rightArmUvs0[1], rightArmUvs0[2], rightArmUvs0[3]]
  this.rightArmGeometry.faceVertexUvs[0][2] = [rightArmUvs1[0], rightArmUvs1[1], rightArmUvs1[3]]
  this.rightArmGeometry.faceVertexUvs[0][3] = [rightArmUvs1[1], rightArmUvs1[2], rightArmUvs1[3]]
  this.rightArmGeometry.faceVertexUvs[0][0] = [rightArmUvs2[0], rightArmUvs2[1], rightArmUvs2[3]]
  this.rightArmGeometry.faceVertexUvs[0][1] = [rightArmUvs2[1], rightArmUvs2[2], rightArmUvs2[3]]
  this.rightArmGeometry.faceVertexUvs[0][10] = [rightArmUvs3[0], rightArmUvs3[1], rightArmUvs3[3]]
  this.rightArmGeometry.faceVertexUvs[0][11] = [rightArmUvs3[1], rightArmUvs3[2], rightArmUvs3[3]]
  this.rightArmGeometry.faceVertexUvs[0][4] = [rightArmUvs4[0], rightArmUvs4[1], rightArmUvs4[3]]
  this.rightArmGeometry.faceVertexUvs[0][5] = [rightArmUvs4[1], rightArmUvs4[2], rightArmUvs4[3]]
  this.rightArmGeometry.faceVertexUvs[0][6] = [rightArmUvs5[0], rightArmUvs5[1], rightArmUvs5[3]]
  this.rightArmGeometry.faceVertexUvs[0][7] = [rightArmUvs5[1], rightArmUvs5[2], rightArmUvs5[3]]

  this.leftArmGeometry = this.rightArmGeometry.clone()

  this.rightLegGeometry = new THREE.BoxGeometry(0.225, 0.675, 0.225)

  var rightLegUvs0 = [new THREE.Vector2(0.0625, 0.375), new THREE.Vector2(0.0625, 0), new THREE.Vector2(0.125, 0), new THREE.Vector2(0.125, 0.375)]
  var rightLegUvs1 = [new THREE.Vector2(0, 0.375), new THREE.Vector2(0, 0), new THREE.Vector2(0.0625, 0), new THREE.Vector2(0.0625, 0.375)]
  var rightLegUvs2 = [new THREE.Vector2(0.1875, 0.375), new THREE.Vector2(0.125, 0), new THREE.Vector2(0.1875, 0), new THREE.Vector2(0.1875, 0.375)]
  var rightLegUvs3 = [new THREE.Vector2(0.1875, 0.375), new THREE.Vector2(0.1875, 0), new THREE.Vector2(0.25, 0), new THREE.Vector2(0.25, 0.375)]
  var rightLegUvs4 = [new THREE.Vector2(0.0625, 0.5), new THREE.Vector2(0.0625, 0.375), new THREE.Vector2(0.125, 0.375), new THREE.Vector2(0.125, 0.5)]
  var rightLegUvs5 = [new THREE.Vector2(0.125, 0.5), new THREE.Vector2(0.125, 0.375), new THREE.Vector2(0.1875, 0.375), new THREE.Vector2(0.1875, 0.5)]

  this.rightLegGeometry.faceVertexUvs[0][8] = [rightLegUvs0[0], rightLegUvs0[1], rightLegUvs0[3]]
  this.rightLegGeometry.faceVertexUvs[0][9] = [rightLegUvs0[1], rightLegUvs0[2], rightLegUvs0[3]]
  this.rightLegGeometry.faceVertexUvs[0][2] = [rightLegUvs1[0], rightLegUvs1[1], rightLegUvs1[3]]
  this.rightLegGeometry.faceVertexUvs[0][3] = [rightLegUvs1[1], rightLegUvs1[2], rightLegUvs1[3]]
  this.rightLegGeometry.faceVertexUvs[0][0] = [rightLegUvs2[0], rightLegUvs2[1], rightLegUvs2[3]]
  this.rightLegGeometry.faceVertexUvs[0][1] = [rightLegUvs2[1], rightLegUvs2[2], rightLegUvs2[3]]
  this.rightLegGeometry.faceVertexUvs[0][10] = [rightLegUvs3[0], rightLegUvs3[1], rightLegUvs3[3]]
  this.rightLegGeometry.faceVertexUvs[0][11] = [rightLegUvs3[1], rightLegUvs3[2], rightLegUvs3[3]]
  this.rightLegGeometry.faceVertexUvs[0][4] = [rightLegUvs4[0], rightLegUvs4[1], rightLegUvs4[3]]
  this.rightLegGeometry.faceVertexUvs[0][5] = [rightLegUvs4[1], rightLegUvs4[2], rightLegUvs4[3]]
  this.rightLegGeometry.faceVertexUvs[0][6] = [rightLegUvs5[0], rightLegUvs5[1], rightLegUvs5[3]]
  this.rightLegGeometry.faceVertexUvs[0][7] = [rightLegUvs5[1], rightLegUvs5[2], rightLegUvs5[3]]

  this.leftLegGeometry = this.rightLegGeometry.clone()

  var add = new THREE.Vector3()

  add.set(0, 0.225, 0)
  for (var i in this.headGeometry.vertices) {
    this.headGeometry.vertices[i].add(add)
  }
  add.set(-0.3375, -0.1125, 0)
  for (var i in this.rightArmGeometry.vertices) {
    this.rightArmGeometry.vertices[i].add(add)
  }

  add.set(0.3375, -0.1125, 0)
  for (var i in this.rightArmGeometry.vertices) {
    this.leftArmGeometry.vertices[i].add(add)
  }

  add.set(-0.1125, -0.1125, 0)
  for (var i in this.rightArmGeometry.vertices) {
    this.rightLegGeometry.vertices[i].add(add)
  }

  add.set(0.1125, -0.1125, 0)
  for (var i in this.rightArmGeometry.vertices) {
    this.leftLegGeometry.vertices[i].add(add)
  }

  this.headMesh = new THREE.Mesh(this.headGeometry, this.material)
  this.bodyMesh = new THREE.Mesh(this.bodyGeometry, this.material)
  this.rightArmMesh = new THREE.Mesh(this.rightArmGeometry, this.material)
  this.leftArmMesh = new THREE.Mesh(this.leftArmGeometry, this.material)
  this.rightLegMesh = new THREE.Mesh(this.rightLegGeometry, this.material)
  this.leftLegMesh = new THREE.Mesh(this.leftLegGeometry, this.material)

  var location = player.getLocation()// 정확히 오른발과 왼발 사이

  this.headMesh.position.set(location.x, location.y + 1.35, location.z)
  this.bodyMesh.position.set(location.x, location.y + 1.0125, location.z)
  this.rightArmMesh.position.set(location.x, location.y + 1.125, location.z)
  this.leftArmMesh.position.set(location.x, location.y + 1.125, location.z)
  this.rightLegMesh.position.set(location.x, location.y + 0.45, location.z)
  this.leftLegMesh.position.set(location.x, location.y + 0.45, location.z)

  var group = Vokkit.getClient().getSceneManager().getGroup()
  if (!player.isLocalPlayer) {
    group.add(this.headMesh)
  }
  group.add(this.bodyMesh)
  group.add(this.rightArmMesh)
  group.add(this.leftArmMesh)
  group.add(this.rightLegMesh)
  group.add(this.leftLegMesh)
}

PlayerBody.prototype = new Body()

PlayerBody.prototype.updatePosition = function (location, velocity) {
  if (notRender == undefined && Vokkit.getClient().getLocalPlayer() != undefined) {
    if (Vokkit.getClient().getLocalPlayer().getName() == this.name) {
      notRender = true
      var group = Vokkit.getClient().getSceneManager().getGroup()
      group.remove(this.headMesh)
      group.remove(this.bodyMesh)
      group.remove(this.rightArmMesh)
      group.remove(this.leftArmMesh)
      group.remove(this.rightLegMesh)
      group.remove(this.leftLegMesh)
    } else {
      notRender = false
    }
  }
  if (notRender) return
  this.headMesh.position.set(location.x, location.y + 1.35, location.z)
  this.headMesh.lookAt(new THREE.Vector3(this.headMesh.position.x - Math.sin(location.getYaw()) * Math.cos(location.getPitch()), this.headMesh.position.y + Math.sin(location.getPitch()), this.headMesh.position.z + Math.cos(location.getYaw()) * Math.cos(location.getPitch())))

  this.bodyYaw = Math.atan2(velocity.x, velocity.z)
  this.bodyPitch = Math.asin(-velocity.y)
  var bodyYawSin = -Math.sin(this.bodyYaw)
  var bodyYawCos = Math.cos(this.bodyYaw)
  var ArmYawSin = -Math.sin(this.bodyYaw + Math.PI / 2)
  var ArmYawCos = Math.cos(this.bodyYaw + Math.PI / 2)

  this.bodyMesh.position.set(location.x, location.y + 1.0125, location.z)
  this.bodyMesh.lookAt(new THREE.Vector3(this.bodyMesh.position.x - bodyYawSin, this.bodyMesh.position.y, this.bodyMesh.position.z + bodyYawCos))

  this.rightArmMesh.position.set(location.x, location.y + 1.125, location.z)
  this.rightArmMesh.lookAt(new THREE.Vector3(this.rightArmMesh.position.x - bodyYawSin, this.rightArmMesh.position.y, this.rightArmMesh.position.z + bodyYawCos))

  this.leftArmMesh.position.set(location.x, location.y + 1.125, location.z)
  this.leftArmMesh.lookAt(new THREE.Vector3(this.leftArmMesh.position.x - bodyYawSin, this.leftArmMesh.position.y, this.leftArmMesh.position.z + bodyYawCos))

  if (rightLegMove) {
    if (legMove != 0 || walkOn) legMove += 0.05
    if (legMove >= 1) {
      rightLegMove = false
    }
  } else {
    if (legMove != 0 || walkOn) legMove -= 0.05
    if (legMove <= -1) {
      rightLegMove = true
    }
  }
  walkOn = false

  var rightPitch = legMove * 30 / 180 * Math.PI
  var leftPitch = -legMove * 30 / 180 * Math.PI
  var bodyPitchSin = Math.sin(rightPitch)
  var bodyPitchCos = Math.cos(rightPitch)

  this.rightLegMesh.position.set(location.x, location.y + 0.45, location.z)
  this.rightLegMesh.lookAt(new THREE.Vector3(this.rightLegMesh.position.x - bodyYawSin * bodyPitchCos, this.rightLegMesh.position.y + bodyPitchSin, this.rightLegMesh.position.z + bodyYawCos * bodyPitchCos))

  bodyPitchSin = Math.sin(leftPitch)
  bodyPitchCos = Math.cos(leftPitch)
  this.leftLegMesh.position.set(location.x, location.y + 0.45, location.z)
  this.leftLegMesh.lookAt(new THREE.Vector3(this.leftLegMesh.position.x - bodyYawSin * bodyPitchCos, this.leftLegMesh.position.y + bodyPitchSin, this.leftLegMesh.position.z + bodyYawCos * bodyPitchCos))
}

var rightLegMove = 1 // 오른다리 z+ 방향 움직임.
var legMove = 0// 움직임 진행도(-1<legMove<1);
var walkOn = false

PlayerBody.prototype.playAnimation = function (animationName) {
  if (notRender) return
  if (animationName == 'walk') {
    walkOn = true
  }
}

PlayerBody.prototype.constructor = PlayerBody

module.exports = PlayerBody
