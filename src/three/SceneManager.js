import * as THREE from 'three'
import Biomes from './Biomes.js'
import OrbitControls from './OrbitControls.js'

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
  const biomes = createBiomes(scene, camera)
  buildOrbitControls(biomes.starterBiome.cube)
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

  function buildOrbitControls(mesh) {
    return new OrbitControls(mesh)
  }

  function buildCamera({ width, height }) {
    return new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
  }

  function createBiomes(scene, camera) {
    return new Biomes(scene, camera)
  }
  
  function loadModel(name) {
    let loader = new THREE.GLTFLoader()
    loadString = `models/${name}/${name}.gltf` // depends on our directory structure for models
    loader.load(
      loadString, (gltf) => {
        scene.add(gltf.scene)
        // Model settings
        // gltf.animations
        // gltf.scene
        // gltf.scenes
        // gltf.cameras
        // gltf.asset
      }, (xrh) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      }, (err) => {
        console.log('An error occurred!')
      }
    )
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
