import Chance from 'chance'

export const groupVertices = arr => {
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

export const sample = (vertices, n, gridSize, bounds) => {
  const chance = new Chance(3)

  const [[lowerX, upperX], [lowerZ, upperZ]] = bounds
  const lenX = upperX - lowerX
  const lenZ = upperZ - lowerZ

  const [gridX, gridZ] = gridSize

  // All this code below is just to fill a 2D grid with y positions
  const grid = Array(gridX)
    .fill()
    .map(() => Array(gridZ))

  vertices.forEach(([x, y, z]) => {
    const i = Math.round(((gridX - 1) * (x - lowerX)) / lenX)
    const j = Math.round(((gridZ - 1) * (z - lowerZ)) / lenZ)
    if (i >= 0 && i < gridX && j >= 0 && j < gridZ) {
      grid[i][j] = y
    }
  })

  // Fill undefined spots in grid
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === undefined) {
        let sum = 0
        let count = 0
        const dirs = [
          [0, 1],
          [0, -1],
          [-1, 0],
          [1, 0]
        ]
        dirs.forEach(dir => {
          const newI = i + dir[0]
          const newJ = j + dir[1]
          if (
            newI >= 0 &&
            newI < grid.length &&
            newJ >= 0 &&
            newJ < grid[i].length &&
            grid[newI][newJ] !== undefined
          ) {
            sum += grid[newI][newJ]
            count += 1
          }
        })
        grid[i][j] = sum / count
      }
    }
  }

  const flattenedGrid = []

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      flattenedGrid.push([
        lenX * (i / (gridX - 1)) + lowerX,
        grid[i][j],
        lenZ * (j / (gridZ - 1)) + lowerZ
      ])
    }
  }
  
  return flattenedGrid.sort(() => 0.5 - chance.random()).splice(0, n)
}

export const sampleVertices = (vertices, n, [gridX, gridY], bounds) => {
  const chance = new Chance(3)
  const [[bx0, bx1], [by0, by1]] = bounds
  const seen = {}
  vertices.filter(pt => {
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
