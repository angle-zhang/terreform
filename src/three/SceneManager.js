import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import Biomes from './Biomes.js'
import OrbitControls from './OrbitControls.js'
import { loadedModels, loadModels} from './ModelLoader.js'
import poissonDiskSampling from './PoissonDiskSampling.js'
import { getBounds, separateCoordinates } from './NodeGen.js'
import Dot from './Dot.js'

/**
 * Options
 *   backgroundColor: hex #
 *   lighting:
 *     color: hex #
 *     intensity: 1
 *     position: { x, y, z }
 */

const loadItem = (name, scene) => {
  const model = loadedModels[name]
  scene.add(model)
  console.log('loading into scene... ' + name)
  return model
}

export default async (canvas, { backgroundColor = 0x000000, lighting } = {}) => {
  await loadModels()

  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  const scene = buildScene()
  const renderer = buildRender(screenDimensions)
  const camera = buildCamera(screenDimensions)
  const raycaster = buildRaycaster()
  const biomes = createBiomes(scene, camera)
  const controls = buildOrbitControls(biomes.getCurrent().group)
  addLight(scene, lighting)
    
  // TEMPORARY way to switch biomes
  document.addEventListener('keypress', event => {
    if (event.keyCode === 32) {
      biomes.next()
      controls.group = biomes.getCurrent().group
    }
  })

  function buildScene() {
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(backgroundColor)
    return scene
  }

  function buildRender({ width, height }) {
    let renderer = new THREE.WebGLRenderer({ antialias: true, canvas: canvas })
    renderer.setSize(width, height)
    renderer.setClearColor(backgroundColor, 1)
    // Helps make loaded models brighter
    renderer.gammaFactor = 2.2
    renderer.gammaOutput = true
    return renderer
  }

  function buildOrbitControls(group) {
    return new OrbitControls(group)
  }

  function buildCamera({ width, height }) {
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 100)
    camera.setViewOffset(
      window.innerWidth,
      window.innerHeight,
      -150,
      0,
      window.innerWidth,
      window.innerHeight
    )
    camera.position.set(-2, 0, 5)
    return camera
  }

  function createBiomes(scene, camera) {
    return new Biomes(scene, camera);
  }

  function buildRaycaster() {
    const raycaster = new THREE.Raycaster()
    raycaster.linePrecision = 0.1
    return raycaster
  }

  function addLight(
    scene,
    {
      color = 0xffffff,
      intensity = 1, // 3?
      position: { x, y, z } = { x: -1, y: 2, z: 4 }
    }
  ) {
    const light = new THREE.HemisphereLight(color, 0x3c6a6d, intensity)
    light.position.set(x, y, z)
    scene.add(light)
  }

  // DEMO
  // const dot = new Dot({
  //   raycaster,
  //   camera,
  //   radius: 0.2,
  //   position: [3, 0, -6],
  //   handleClick: () => alert('You clicked!')
  // })
  // dot.render(scene)

  let time = 0
  function update() {
    // only update active scene
    TWEEN.update()
    biomes.animate()
    renderer.render(scene, camera)
    // dot.update(time)
    time += 1
  }

  function onWindowResize({ width, height }) {
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
