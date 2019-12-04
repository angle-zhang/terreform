import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import Biomes from './Biomes.js'
import OrbitControls from './OrbitControls.js'
import { loadModels } from './ModelLoader.js'

/**
 * Options
 *   backgroundColor: hex #
 *   lighting:
 *     color: hex #
 *     intensity: 1
 *     position: { x, y, z }
 */
export default async (
  canvas,
  { backgroundColor = 0x000000, lighting } = {}
) => {
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
  addLight(scene, lighting)
  const controls = buildOrbitControls(biomes.getCurrent().group)
    
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
    renderer.shadowMap.enabled = true;
    renderer.shadowMapSoft = true ;
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
      -1 * window.innerWidth / 7,
      0,
      window.innerWidth,
      window.innerHeight
    )
    camera.position.set(0, 0, 0)
    camera.rotation.set(0, 0, 0)
    return camera
  }

  function createBiomes(scene, camera) {
    return new Biomes(scene, camera)
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
      intensity = 0.4,
      position: { x, y, z } = { x: -4, y: 2, z: 0 }
    }
  ) {
    const light = new THREE.AmbientLight(color, intensity)
    scene.add(light)

    const dir = new THREE.PointLight(color, 0.75)
    dir.position.set(x, y, z)
    dir.castShadow = true
    scene.add(dir)
    return dir
  }

  function update() {
    // only update active scene
    TWEEN.update()
    biomes.animate()
    renderer.render(scene, camera)
  }

  function onWindowResize({ width, height }) {
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  return {
    update,
    onWindowResize,
    callbacks: {
      switchBiomes: () => biomes.next()
    },
    scene
  }
}
