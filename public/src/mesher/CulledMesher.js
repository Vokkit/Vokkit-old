class CulledMesh {
  static optimize (volume, dims) {
    const dir = []
    for (let i = 0; i < 3; ++i) {
      dir[i] = [[0, 0, 0], [0, 0, 0]]
      dir[i][0][(i + 1) % 3] = 1
      dir[i][1][(i + 2) % 3] = 1
    }
    const vertices = []
    const faces = []
    const x = [0, 0, 0]
    const B = [[false, true], [false, true], [false, true]]
    let n = -dims[0] * dims[1]
    for (B[2] = [false, true], x[2] = -1; x[2] < dims[2]; B[2] = [true, (++x[2] < dims[2] - 1)]) {
      for (n -= dims[0], B[1] = [false, true], x[1] = -1; x[1] < dims[1]; B[1] = [true, (++x[1] < dims[1] - 1)]) {
        for (n -= 1, B[0] = [false, true], x[0] = -1; x[0] < dims[0]; B[0] = [true, (++x[0] < dims[0] - 1)], ++n) {
          const p = (B[0][0] && B[1][0] && B[2][0]) ? volume[n] : 0
          const b = [(B[0][1] && B[1][0] && B[2][0]) ? volume[n + 1] : 0,
            (B[0][0] && B[1][1] && B[2][0]) ? volume[n + dims[0]] : 0,
            (B[0][0] && B[1][0] && B[2][1]) ? volume[n + dims[0] * dims[1]] : 0
          ]
          for (let d = 0; d < 3; ++d) {
            if ((!!p.id) !== (!!b[d].id)) {
              const s = !p.id ? 1 : 0
              const t = [x[0], x[1], x[2]]
              const u = dir[d][s]
              const v = dir[d][s ^ 1]
              ++t[d]

              const len = vertices.length
              vertices.push([t[0], t[1], t[2]])
              vertices.push([t[0] + u[0], t[1] + u[1], t[2] + u[2]])
              vertices.push([t[0] + u[0] + v[0], t[1] + u[1] + v[1], t[2] + u[2] + v[2]])
              vertices.push([t[0] + v[0], t[1] + v[1], t[2] + v[2]])
              faces.push([len, len + 1, len + 2, len + 3, s ? b[d] : p])
            }
          }
        }
      }
    }
    return { vertices: vertices, faces: faces }
  }
}

module.exports = CulledMesh
