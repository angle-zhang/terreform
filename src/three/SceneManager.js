import * as THREE from 'three'
import Biomes from './Biomes.js'
import Camera from './Camera.js'
import TWEEN from '@tweenjs/tween.js'

// scene manager class
export default canvas => {
  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  const scene = buildScene()
  const renderer = buildRender(screenDimensions)
  const camera = buildCamera(screenDimensions)
  const biomes = createBiomes(scene, camera)

  function buildScene() {
    return new THREE.Scene()
  }

  function buildRender({ width, height }) {
    let webgl = new THREE.WebGLRenderer({ canvas: canvas })
    webgl.setSize(width, height)
    return webgl
  }

  function buildCamera({ width, height }) {
    const perspectiveCamera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    perspectiveCamera.position.set(0, -6, 5)
    const camera = new Camera(perspectiveCamera)
    return camera
  }

  function createBiomes(scene, camera) {
    return new Biomes(scene, camera)
  }

  function update() {
    // only update active scene
    TWEEN.update()
    biomes.starterBiome.animate()
    renderer.render(scene, camera.get())
  }

  function onWindowResize({ width, height }) {
    camera.setAspect(width / height)
    renderer.setSize(width, height)
  }

  return {
    update,
    onWindowResize
  }
}
