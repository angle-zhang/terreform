import * as THREE from 'three'
import Biomes from './Biomes.js'
import './Camera.js'
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
    const camera = new THREE.PerspectiveCamera(
      75,
      width / height,
      0.1,
      1000
    )
    camera.position.set(0, -6, 5)
    return camera
  }

  function createBiomes(scene, camera) {
    return new Biomes(scene, camera)
  }

  function update() {
    // only update active scene
    TWEEN.update()
    biomes.starterBiome.animate()
    renderer.render(scene, camera)
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
