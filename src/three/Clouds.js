import * as THREE from 'three'

const tuftSizes = [1.75, 1.25, 1.25, 1, 1, 0.75, 0.75, 0.65, 0.65]
const tuftLocations = [0, 1.75, -1.75, 2.75, -2.75, 3.4, -3.4, 4, -4]

// Most of this code is from here:
// https://medium.com/@joshmarinacci/procedural-geometry-low-poly-clouds-b86a0e66bcad
export function createCloud(n) {
  const geometry = new THREE.Geometry()

  const sizeMultiplier = Math.random() * 1.5 + 0.5

  for (let i = 0; i < n; i++) {
    // as i increases tuft size decreases
    const tuft = new THREE.SphereGeometry(
      tuftSizes[i] * (0.9 + Math.random() * 0.1) * sizeMultiplier,
      5,
      6
    )
    // place tufts on each side (cosine)
    tuft.translate(tuftLocations[i] * (0.9 + Math.random() * 0.1) * sizeMultiplier, 0, 0)
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
  chopBottom(geometry, -0.5)

  const material = new THREE.MeshPhongMaterial({
    color: 0xffffff,
    opacity: 0.75,
    transparent: true
  })
  geometry.computeFlatVertexNormals()
  return new THREE.Mesh(geometry, material)
}
