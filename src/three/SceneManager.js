import * as THREE from 'three'
import Biomes from './Biomes.js'
import getOrbitControls from 'three-orbit-controls'

const OrbitControls = getOrbitControls(THREE)

/**
 * Options
 *   backgroundColor: hex #
 *   lighting:
 *     color: hex #
 *     intensity: 1
 *     position: { x, y, z }
 */
export default (canvas, { backgroundColor = 0x000000, lighting } = {}) => {
  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  const scene = buildScene()
  const renderer = buildRender(screenDimensions)
  const camera = buildCamera(screenDimensions)
  const controls = buildOrbitControls(camera, renderer)
  const biomes = createBiomes(scene, camera)
  addLight(scene, lighting)

  function buildScene() {
    return new THREE.Scene()
  }

  function buildRender({ width, height }) {
    const webgl = new THREE.WebGLRenderer({ canvas: canvas })
    webgl.setSize(width, height)
    webgl.setClearColor(backgroundColor, 1)
    return webgl
  }

  function buildCamera({ width, height }) {
    return new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  }

  function buildOrbitControls(camera, renderer) {
    const controls = new OrbitControls(camera, renderer.domElement)
    // locks rotation to only around z-axis
    controls.minPolarAngle = Math.PI / 2
    controls.maxPolarAngle = Math.PI / 2
    return controls
  }

  function createBiomes(scene, camera) {
    return new Biomes(scene, camera)
  }

  function addLight(
    scene,
    {
      color = 0xffffff,
      intensity = 1,
      position: { x, y, z } = { x: -1, y: 2, z: 4 }
    }
  ) {
    const light = new THREE.DirectionalLight(color, intensity)
    light.position.set(x, y, z)
    scene.add(light)
  }

  function update() {
    // only update active scene
    biomes.starterBiome.animate()
    controls.update()
    renderer.render(scene, camera)
  }

  function onWindowResize({ width, height }) {
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  return {
    update,
    onWindowResize
  }
}
