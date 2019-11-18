import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import Biomes from './Biomes.js'
import OrbitControls from './OrbitControls.js'
import { getModel, loadedModels } from './ModelLoader.js'
import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from 'constants'

/**
 * Options
 *   backgroundColor: hex #
 *   lighting:
 *     color: hex #
 *     intensity: 1
 *     position: { x, y, z }
 */

const poissonDiskSampling = (radius, k, bounds) => {
  const N = 2
  const cellsize = (radius / Math.sqrt(N))
  const width = bounds[1] - bounds[0]
  const height = bounds[3] - bounds[2]
  let points = []
  let active = []

  let ncells_width = Math.ceil(width / cellsize) + 1
  let ncells_height = Math.ceil(height / cellsize) + 1

  // console.log(ncells_height)
  // console.log(ncells_width)

  const insertPoint = (grid, point) => {
    // console.log(point[0] / cellsize, point[1] / cellsize)
    grid[Math.floor(point[0] / cellsize)][Math.floor(point[1] / cellsize)] = point
  }

  let grid = []
  for (let i = 0; i < ncells_height; i++) {
    let row = []
    for (let j = 0; j < ncells_width; j++) {
      row.push(null)
    }
    grid.push(row)
  }
  console.log('grid')
  console.log(grid)

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

  let randPoint = [Math.random() * width, Math.random() * height]
  // console.log(randPoint)
  points.push(randPoint)
  active.push(randPoint)
  // console.log(grid)

  insertPoint(grid, randPoint)



  while (active.length > 0) {
    let random_index = Math.floor(Math.random() * active.length)
    // let p = active[random_index]
    let p = active[random_index]
    let found = false
    for (let tries = 0; tries < k; tries++) {
      let theta = Math.random() * 2 * Math.PI
      let new_radius = (Math.random() * (radius)) + radius

      let pnewx = p[0] + new_radius * Math.cos(theta)
      let pnewy = p[1] + new_radius * Math.sin(theta)
      let pnew = [pnewx, pnewy]

      if (!isValidPoint(ncells_width, ncells_height, pnew)) {
        console.log('failed')
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
      // console.log('active')
    }
  }

  console.log(points)
}




const loadItem = async (name, scene) => {
  let model = await getModel(name);
  // scene.add(model)
  console.log('loading into scene...')
  return model
}

const loadAll = (modelNames) => {
  let models = new Map()
  modelNames.forEach(async (modelName) => models.set(modelName, await getModel(modelName)))
  return models
}

const getPosition = (object) => {
  let vec = new THREE.Vector3()
  object.getWorldPosition(vec)
  console.log('The location of the object is ' + JSON.stringify(vec))
}

const getScale = (object) => {
  let vec = new THREE.Vector3()
  object.getWorldScale(vec)
  console.log('The scale of the object is ' + JSON.stringify(vec))
}

const separateCoordinates = (mesh) => {
  let x = []
  let y = []
  let z = []
  mesh.geometry.attributes.position.array.forEach((coord, i) => {
    switch (i % 3) {
      case 0:
        x.push(coord)
        break
      case 1:
        y.push(coord)
        break
      case 2:
        z.push(coord)
        break
    }
  })
  return [x, y, z]
}

const getBounds = (coords) => {
  let x = coords[0]
  let z = coords[2]
  x.sort((a, b) => a - b)
  z.sort((a, b) => a - b)
  return [x[0], x[x.length - 1], z[0], z[z.length - 1]]
}

const removePoint = (arr, p) => {
  arr = arr.filter((elem) => elem[0] !== p[0] || elem[1] !== p[1])
  console.log(arr)
}

const a = [[1, 2], [1, 1], [2, 2], [3, 3]]

//async
export default async (canvas, { backgroundColor = 0x000000, lighting } = {}) => {
  // removePoint(a, [1, 1])
  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  const scene = buildScene()
  // scene.background = new THREE.Color(0x8FBCD4)
  const renderer = buildRender(screenDimensions)
  const camera = buildCamera(screenDimensions)
  const biomes = createBiomes(scene, camera)
  // let duck = await loadItem('Duck', scene)
  // duck.translateZ(-.8)
  let treebiome = await loadItem('tree-1', scene)
  getPosition(treebiome)
  getScale(treebiome)
  treebiome.position.set(0, 0, 0)

  treebiome.scale.set(.1, .1, .1)
  // console.log(separateCoordinates(treebiome))
  console.log(getBounds(separateCoordinates(treebiome)))
  console.log('poisson disk')
  poissonDiskSampling(1, 30, [0, 16, 0, 16])
  console.log('poisson disk')
  // console.log(treebiome.geometry.attributes.position.array)
  // treebiome.translateX(-10)
  getPosition(treebiome)
  // const controls = buildOrbitControls(biomes.getCurrent().group)
  addLight(scene, lighting)

  // TEMPORARY way to switch biomes
  document.addEventListener('keypress', event => {
    if (event.keyCode === 32) {
      biomes.next()
      // controls.group = biomes.getCurrent().group
    }
  })

  function buildScene() {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(backgroundColor)
    return scene
  }

  function buildRender({ width, height }) {
    let webgl = new THREE.WebGLRenderer({ antialias: true, canvas: canvas });
    webgl.setSize(width, height);
    webgl.setClearColor(backgroundColor, 1)
    return webgl;
  }

  function buildOrbitControls(group) {
    return new OrbitControls(group)
  }

  function buildCamera({ width, height }) {
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
    camera.setViewOffset(
      window.innerWidth,
      window.innerHeight,
      300,
      0,
      window.innerWidth,
      window.innerHeight
    )
    camera.position.set(0, 0, 3)
    return camera
  }

  function createBiomes(scene, camera) {
    return new Biomes(scene, camera)
  }

  function addLight(
    scene,
    {
      color = 0xffffff,
      intensity = 5,
      position: { x, y, z } = { x: -1, y: 2, z: 4 }
    }
  ) {
    const light = new THREE.HemisphereLight(color, 0x3C6A6D, intensity)
    light.position.set(x, y, z)
    scene.add(light)
  }

  function update() {
    // only update active scene
    TWEEN.update()
    biomes.animate()
    renderer.render(scene, camera)
  }

  function onWindowResize({ width, height }) {
    console.log('resizing')
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  return {
    update,
    onWindowResize,
    scene
  }
}