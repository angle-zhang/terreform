import Chance from 'chance'

export const poissonDiskSampling = (radius, k, bounds) => {
    const chance = new Chance(1)
    // SETUP
    const N = 2
    const cellsize = (radius / Math.sqrt(N))
    const width = bounds[1] - bounds[0]
    const height = bounds[3] - bounds[2]
    let points = []
    let active = []

    let ncells_width = Math.ceil(width / cellsize) + 1
    let ncells_height = Math.ceil(height / cellsize) + 1

    let grid = []
    for (let i = 0; i < ncells_height; i++) {
        let row = []
        for (let j = 0; j < ncells_width; j++) {
            row.push(null)
        }
        grid.push(row)
    }

    // HELPERS
    const insertPoint = (grid, point) => {
        grid[Math.floor(point[0] / cellsize)][Math.floor(point[1] / cellsize)] = point
    }

    const dist = (x1, y1, x2, y2) => {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2))
    }

    const isValidPoint = (gwidth, gheight, p) => {
        if (p[0] < 0 || p[0] >= width || p[1] < 0 || p[1] >= height) {
            return false
        }

        let xindex = Math.floor(p[0] / cellsize)
        let yindex = Math.floor(p[1] / cellsize)
        let i0 = Math.max(xindex - 1, 0)
        let i1 = Math.min(xindex + 1, gwidth - 1)
        let j0 = Math.max(yindex - 1, 0)
        let j1 = Math.min(yindex + 1, gheight - 1)

        for (let i = i0; i <= i1; i++) {
            for (let j = j0; j <= j1; j++) {
                if (grid[i][j] != null) {
                    if (dist(grid[i][j][0], grid[i][j][1], p[0], p[1]) < radius) {
                        return false
                    }
                }
            }
        }
        return true
    }

    // ALGORITHM
    let randPoint = [chance.random() * width, chance.random() * height]
    points.push(randPoint)
    active.push(randPoint)


    insertPoint(grid, randPoint)

    while (active.length > 0) {
        let random_index = Math.floor(chance.random() * active.length)
        let p = active[random_index]
        let found = false
        for (let tries = 0; tries < k; tries++) {
            let theta = chance.random() * 2 * Math.PI
            let new_radius = (chance.random() * (radius)) + radius
            let pnewx = p[0] + new_radius * Math.cos(theta)
            let pnewy = p[1] + new_radius * Math.sin(theta)
            let pnew = [pnewx, pnewy]

            if (!isValidPoint(ncells_width, ncells_height, pnew)) {
                continue
            }
            points.push(pnew)
            insertPoint(grid, pnew)
            active.push(pnew)
            found = true
            break
        }
        if (!found) {
            active = active.filter((element) => element[0] !== p[0] || element[1] !== p[1])
        }
    }

    return points.map(point => [point[0] + bounds[0], point[1] + bounds[2]])
}
