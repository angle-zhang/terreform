import Chance from 'chance'

export const groupVertices = mesh => {
  const arr = mesh.geometry.attributes.position.array
  const vertices = []
  for (let i = 0; i < arr.length / 3; i++) {
    const coord = []
    for (let j = 0; j < 3; j++) {
      coord.push(arr[i * 3 + j])
    }
    vertices.push(coord)
  }
  return vertices
}

export const sampleVertices = (vertices, n, [gridX, gridY], bounds) => {
  const chance = new Chance(1)
  const [[bx0, bx1], [by0, by1]] = bounds
  const seen = {}
  vertices.filter((pt) => {
    if (seen[pt]) {
      return false
    }
    seen[pt] = true
    return true
  })
  const isWithinBounds = ([x, , z]) =>
    Math.abs(x - bx0) < (bx1 - bx0) / gridX ||
    Math.abs(x - bx1) < (bx1 - bx0) / gridX ||
    Math.abs(z - by0) < (by1 - by0) / gridY ||
    Math.abs(z - by1) < (by1 - by0) / gridY
  const shuffledVertices = vertices
    .filter(pt => {
      if (isWithinBounds(pt)) {
        return false
      }
      return true
    })
    .sort(() => 0.5 - chance.random())
  return shuffledVertices.splice(0, n)
}
