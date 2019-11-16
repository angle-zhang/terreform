import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import Biomes from './Biomes.js'
import OrbitControls from './OrbitControls.js'
import getModel from './ModelLoader.js'

/**
 * Options
 *   backgroundColor: hex #
 *   lighting:
 *     color: hex #
 *     intensity: 1
 *     position: { x, y, z }
 */

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
  mesh.geometry.attributes.position.array.filter.forEach((coord, i) => {
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

//async
export default async (canvas, { backgroundColor = 0x000000, lighting } = {}) => {
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
  separateCoordinates(treebiome)
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