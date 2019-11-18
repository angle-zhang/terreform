import * as THREE from 'three'

// Most of this code is from here:
// https://medium.com/@joshmarinacci/procedural-geometry-low-poly-clouds-b86a0e66bcad
export function createCloud(n) {
  const geometry = new THREE.Geometry()

  for (let i = 0; i < n; i++) {
    // as i increases tuft size decreases
    const tuft = new THREE.SphereGeometry(
      (Math.random() * 0.2 + 0.8) * 1.5 * (1.5 ** (-1 * i)) + 1,
      5,
      6
    )
    // place tufts on each side (cosine)
    tuft.translate(
      i == 0 ? 0 : (Math.random() * 0.05 + 0.95) * 0.25 * (i + 10) * Math.cos(i * Math.PI),
      0,
      0
    )
    geometry.merge(tuft)
  }

  const map = (val, smin, smax, emin, emax) =>
    ((emax - emin) * (val - smin)) / (smax - smin) + emin
  const jitter = (geo, per) =>
    geo.vertices.forEach(v => {
      v.x += map(Math.random(), 0, 1, -per, per)
      v.y += map(Math.random(), 0, 1, -per, per)
      v.z += map(Math.random(), 0, 1, -per, per)
    })
  jitter(geometry, 0.15)

  const chopBottom = (geo, bottom) =>
    geo.vertices.forEach(v => (v.y = Math.max(v.y, bottom)))
  chopBottom(geometry, -0.25)

  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    opacity: 0.5,
    transparent: true
  })
  geometry.computeFlatVertexNormals()
  return new THREE.Mesh(geometry, material)
}
