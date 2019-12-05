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
  { backgroundColor = 0x000000, lighting } = {},
  renderPopup, donationIds
) => {
  await loadModels()

  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  let mouse = new THREE.Vector2()
  let intersecting
  const scene = buildScene()
  const renderer = buildRender(screenDimensions)
  const camera = buildCamera(screenDimensions)
  const raycaster = buildRaycaster()
  const biomes = createBiomes(scene, camera, donationIds)
  const controls = buildOrbitControls(biomes.getCurrent().group)
  const treeObjects = biomes.biomes[0].trees
  addLight(scene, lighting)

  // TEMPORARY way to switch biomes
  document.addEventListener('mousemove', onMouseMove, false)
  document.onclick = onClick

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
      -1 * window.innerWidth / 7,
      0,
      window.innerWidth,
      window.innerHeight
    )
    camera.position.set(0, 0, 0)
    camera.rotation.set(0, 0, 0)
    return camera
  }

  function createBiomes(scene, camera, donationIds) {
    return new Biomes(scene, camera, donationIds)
  }

  function buildRaycaster() {
    const raycaster = new THREE.Raycaster()
    raycaster.linePrecision = 0.1
    return raycaster
  }

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    const treeObject = isDonationTree(intersecting[0])
    if (treeObject) {
      treeObject['tree'].material.color.set(0xff0000)
    }
  }

  function onClick(event) {
    const treeObject = isDonationTree(intersecting[0])
    if (treeObject) {
      const cleanup = renderPopup(treeObject['userId'], event.clientX, event.clientY)
      setTimeout(() => {
        cleanup()
      }, 1000)
    }
  }

  function addLight(
    scene,
    {
      color = 0xffffff,
      intensity = 0.35,
      position: { x, y, z } = { x: -1, y: 2, z: 4 }
    }
  ) {
    const light = new THREE.HemisphereLight(color, 0x3c6a6d, intensity)
    light.position.set(x, y, z)
    scene.add(light)

    const dir = new THREE.DirectionalLight(color, 0.75)
    dir.position.set(x, y, z)
    scene.add(dir)
  }

  function update() {
    // only update active scene
    TWEEN.update()
    biomes.animate()
    raycaster.setFromCamera(mouse, camera);

    // Check for intersecting trees
    scene.children.forEach((child) => {
      let intersects = raycaster.intersectObject(child, true)
      if (intersects.length > 0) {
        intersecting = intersects
        // console.log(intersecting)
      }
    })

    // Reset tree colors if not intersecting
    treeObjects.forEach(treeObject => {
      if (!isDonationTree(intersecting[0])) {
        treeObject['tree'].material.color.set(0xffffff)
      }

    })
    renderer.render(scene, camera)
  }

  function onWindowResize({ width, height }) {
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  function isDonationTree(model) {
    const treeObjectResult = treeObjects.filter(treeObject => treeObject['tree'].uuid === model.object.uuid)
    return treeObjectResult.length > 0 && treeObjectResult[0]['userId'] ? treeObjectResult[0] : null
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
