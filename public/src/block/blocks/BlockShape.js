class BlockShape {
  constructor (isNull = false) {
    this.shape = isNull ? [] : [new Shape()]
  }

  addShape (x1, y1, z1, x2, y2, z2) {
    this.shape.push(new Shape(x1, y1, z1, x2, y2, z2))
  }

  getShapes () {
    return this.shape
  }
}

class Shape {
  constructor (x1 = 0, y1 = 0, z1 = 0, x2 = 1, y2 = 1, z2 = 1) {
    this.x1 = x1
    this.x2 = x2

    this.y1 = y1
    this.y2 = y2

    this.z1 = z1
    this.z2 = z2
  }

  getBoxSize () {
    return [this.x2 - this.x1, this.y2 - this.y1, this.z2 - this.z1]
  }

  getBoxOffset () {
    return [this.x1, this.y1, this.z1]
  }

  getAverageOffset () {
    return [
      (this.x2 - this.x1) / 2,
      (this.y2 - this.y1) / 2,
      (this.z2 - this.z1) / 2
    ]
  }
}

module.exports = BlockShape
