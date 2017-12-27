let mask = new Int32Array(4096)

class GreedyMesh {
  static optimize (volume, dims) {
    function f (i, j, k) {
      return volume[i + dims[0] * (j + dims[1] * k)]
    }
    const vertices = []
    const faces = []
    for (let d = 0; d < 3; ++d) {
      const u = (d + 1) % 3
      const v = (d + 2) % 3
      const x = [0, 0, 0]
      const q = [0, 0, 0]
      let i, j, k, l, w, h
      if (mask.length < dims[u] * dims[v]) {
        mask = new Int32Array(dims[u] * dims[v])
      }
      q[d] = 1
      for (x[d] = -1; x[d] < dims[d];) {
        let n = 0
        for (x[v] = 0; x[v] < dims[v]; ++x[v]) {
          for (x[u] = 0; x[u] < dims[u]; ++x[u], ++n) {
            const a = (x[d] >= 0 ? f(x[0], x[1], x[2]) : 0)
            const b = (x[d] < dims[d] - 1 ? f(x[0] + q[0], x[1] + q[1], x[2] + q[2]) : 0)
            if ((!!a) === (!!b)) {
              mask[n] = 0
            } else if (a) {
              mask[n] = a
            } else {
              mask[n] = -b
            }
          }
        }
        ++x[d]
        n = 0
        for (j = 0; j < dims[v]; ++j) {
          for (i = 0; i < dims[u];) {
            let c = mask[n]
            if (c) {
              for (w = 1; c === mask[n + w] && i + w < dims[u]; ++w) {
              }
              let done = false
              for (h = 1; j + h < dims[v]; ++h) {
                for (k = 0; k < w; ++k) {
                  if (c !== mask[n + k + h * dims[u]]) {
                    done = true
                    break
                  }
                }
                if (done) {
                  break
                }
              }
              x[u] = i; x[v] = j
              const du = [0, 0, 0]
              const dv = [0, 0, 0]
              if (c > 0) {
                dv[v] = h
                du[u] = w
              } else {
                c = -c
                du[v] = h
                dv[u] = w
              }
              const len = vertices.length
              vertices.push([x[0], x[1], x[2]])
              vertices.push([x[0] + du[0], x[1] + du[1], x[2] + du[2]])
              vertices.push([x[0] + du[0] + dv[0], x[1] + du[1] + dv[1], x[2] + du[2] + dv[2]])
              vertices.push([x[0] + dv[0], x[1] + dv[1], x[2] + dv[2]])
              faces.push([len, len + 1, len + 2, len + 3, c])
              for (l = 0; l < h; ++l) {
                for (k = 0; k < w; ++k) {
                  mask[n + k + l * dims[u]] = 0
                }
              }
              i += w; n += w
            } else {
              ++i; ++n
            }
          }
        }
      }
    }
    return { vertices: vertices, faces: faces }
  }
}

module.exports = GreedyMesh
