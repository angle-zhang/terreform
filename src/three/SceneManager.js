import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import Biomes from './Biomes.js'
import Dot from './Dot'
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
  // const dot = buildDot(scene, camera, [0, 1, -3], dotClick)
  const controls = buildOrbitControls(biomes.getCurrent().group)
  const treeObjects = biomes.biomes[0].trees
  const cropObjects = biomes.biomes[1].crops
  const seaCreatureObjects = biomes.biomes[2].sealife
  const donationObjects = [...treeObjects, ...seaCreatureObjects]
  // const dots = createDots(donationObjects, scene, camera, dotClick)
  // console.log(dots)
  console.log('tree objects', treeObjects)
  console.log('crop objects', cropObjects)
  console.log('sea life objects', seaCreatureObjects)

  addLight(scene, lighting)

  // TEMPORARY way to switch biomes
  document.addEventListener('keypress', event => {
    if (event.keyCode === 32) {
      biomes.next()
      controls.group = biomes.getCurrent().group
    } else if (event.keyCode === 13) {
      biomes.prev()
      controls.group = biomes.getCurrent().group
    }
  })

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
    renderer.shadowMap.enabled = true
    renderer.shadowMapSoft = true
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
      (-1 * window.innerWidth) / 12,
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

  function buildDot(scene, camera, position, handleClick) {
    const options = {
      radius: .05,
      position,
      raycaster: buildRaycaster(),
      camera,
      handleClick
    }
    const dot = new Dot(options)
    dot.render(scene)
    return dot
  }

  function createDots(donationObjects, scene, camera, handleClick) {
    const dots = donationObjects.forEach(donationObject => {
      const pos = donationObject['model'].position
      buildDot(scene, camera, [pos.x, pos.y, pos.z], handleClick)
    })
    return dots
  }

  function onMouseMove(event) {
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
    const treeObject = isDonation(intersecting[0])
    if (treeObject) {
      treeObject['model'].material.color.set(0x404040)
    }
  }

  function onClick(event) {
    const treeObject = isDonation(intersecting[0])
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
    raycaster.setFromCamera(mouse, camera);
    // Check for intersecting trees
    donationObjects.forEach((child) => {
      let intersects = raycaster.intersectObject(child.model, true)
      if (intersects.length > 0) {
        intersecting = intersects
        // console.log(intersecting)
      }
    })

    // Reset tree colors if not intersecting
    if (!isDonation(intersecting[0])) {
      donationObjects.forEach(treeObject => {
        // console.log(treeObject['model'].material.color)
        // console.log(treeObject.baseColor)
        treeObject['model'].material.color.set(treeObject.baseColor)
      })
    }
    renderer.render(scene, camera)
  }

  function onWindowResize({ width, height }) {
    camera.aspect = width / height
    camera.updateProjectionMatrix()
    renderer.setSize(width, height)
  }

  function isDonationTree(model) {
    const treeObjectResult = treeObjects.find(treeObject => treeObject['model'].uuid === model.object.uuid) //tree
    return treeObjectResult && treeObjectResult['userId'] ? treeObjectResult : null
  }

  function isDonation(model) {
    const objectResult = donationObjects.find(donationObject => donationObject['model'].uuid === model.object.uuid)
    return objectResult && objectResult['userId'] ? objectResult : null
  }

  return {
    update,
    onWindowResize,
    callbacks: {
      nextBiome: () => biomes.next(),
      prevBiome: () => biomes.prev(),
      addObject: index => biomes.addObject(index)
    },
    scene
  }
}
