import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
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

//async
export default (canvas, { backgroundColor = 0x000000, lighting } = {}) => {
  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  }

  const scene = buildScene()
  const renderer = buildRender(screenDimensions)
  const camera = buildCamera(screenDimensions)
  const biomes = createBiomes(scene, camera)
  // await biomes.loadItem('treebiome5')
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
    const webgl = new THREE.WebGLRenderer({ canvas: canvas })
    webgl.setSize(width, height)
    return webgl
  }

  function buildOrbitControls(group) {
    return new OrbitControls(group)
  }

  function buildCamera({ width, height }) {
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.setViewOffset(
      window.innerWidth,
      window.innerHeight,
      300,
      0,
      window.innerWidth,
      window.innerHeight
    )
    camera.position.set(0, 0, 0)
    return camera
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
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  return {
    update,
    onWindowResize
  }
}