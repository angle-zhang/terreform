import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { loadedModels } from './ModelLoader.js'
import Chance from 'chance'

import { groupVertices, sampleVertices } from './Vertices'

import { Flock } from './Boids.js'
import { createCloud } from './Clouds.js'

// define scene classes here
// pseudo abstract class
class Biome {
  constructor(scene, camera) {
    this._scene = scene
    this._camera = camera
    if (this.constructor === Biome) {
      throw new TypeError(
        'Abstract class Biome cannot be instantiated directly.'
      )
    }
  }

  setScene() {
    // set scene and camera variables : background color, camera position, etc.
    throw new TypeError(
      'Class(es) extending the biome abstract class are missing the setScene method.'
    )
  }

  setObjects() {
    // create and add scene objects
    throw new TypeError(
      'Class(es) extending the biome abstract class are missing the setObjects method.'
    )
  }

  animate() {
    // update objects by animation frame
    throw new TypeError(
      'Class(es) extending the biome abstract class are missing the animate method.'
    )
  }
}

class EnvironmentBiome extends Biome {
  constructor(scene, camera) {
    super(scene, camera)
    this.setObjects()
  }

  setScene() {
    // Add clouds in random positions
    const clouds = []
    for (let i = 0; i < 15; i++) {
      const cloud = createCloud(Math.random() * 5 + 3)
      const x = Math.random() * 60 - 30
      const z = Math.sign(Math.random() - 0.5) * Math.sqrt(30 ** 2 - x ** 2)
      cloud.position.set(x, Math.random() * 15 - 10, z)
      cloud.rotation.y = Math.atan2(x, z)
      clouds.push(cloud)
    }
    this.clouds = new THREE.Object3D()
    clouds.forEach(cloud => this.clouds.add(cloud))
    this._scene.add(this.clouds)

    this.flocks = new Array(2).fill().map(
      () =>
        new Flock(
          10,
          [
            [-25, 45],
            [-10, 10]
          ],
          0.15
        )
    )
    this.flocks.forEach(flock => flock.render(this._scene))
  }

  setObjects() {}

  removeScene() {
    if (this.flocks) {
      this.flocks.forEach(flock => flock.remove(this._scene))
    }
    if (this.clouds) {
      this._scene.remove(this.clouds)
    }
  }

  animate() {
    if (this.flocks) {
      this.flocks.forEach(flock => flock.update())
    }
    if (this.clouds) {
      this.clouds.rotateY(0.0005)
    }
  }
}

class TreeBiome extends Biome {
  constructor(scene, camera, position) {
    super(scene, camera)
    this.chance = new Chance(10)
    this.setObjects(position)
  }

  setScene() {
    const oldColor = this._scene.background
    const newColor = 0x8dd7d4
    const duration = 1000
    new TWEEN.Tween(oldColor)
      .to(new THREE.Color(newColor), duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => (this._scene.background = oldColor))
      .start()
  }

  removeScene() {}

  setObjects(position) {
    this.group = new THREE.Object3D()

    const top = loadedModels['forestbiome-top'].clone()
    top.scale.set(2, 2, 2)
    this.group.add(top)
    const bottom = loadedModels['forestbiome-bottom'].clone()
    bottom.scale.set(2, 2, 2)
    this.group.add(bottom)
    const vertices = groupVertices(top)
    const randomVertices = sampleVertices(
      vertices,
      30,
      [20, 20],
      [
        [-1, 1],
        [-1, 1]
      ]
    )
    const models = [
      { name: 'rock-1', scale: [0.05, 0.05, 0.05] },
      { name: 'rock-2', scale: [0.1, 0.1, 0.1] },
      { name: 'rock-3', scale: [0.05, 0.05, 0.05] },
      { name: 'tree-1', scale: [0.03, 0.03, 0.03] },
      { name: 'tree-2', scale: [0.03, 0.03, 0.03] },
      { name: 'tree-3', scale: [0.03, 0.03, 0.03] },
      { name: 'tree-4', scale: [0.03, 0.03, 0.03] }
    ]
    randomVertices.forEach(([x, y, z]) => {
      const model =
        models[
          this.chance.weighted([0, 1, 2, 3, 4, 5, 6], [1, 1, 1, 2, 2, 2, 2])
        ]
      const object = loadedModels[model.name].clone()
      const scaleMultiplier = chance.floating({ min: 0.9, max: 1 })
      object.scale.set(...model.scale.map(v => v * scaleMultiplier))
      object.position.set(x * 2, y * 2 + 0.01, z * 2)
      this.group.add(object)
    })

    this.group.position.set(...position)

    // This is needed since world and local rotation is separate, and all the
    // biomes are put into a group, which does not affect local rotation
    this.group.rotateOnWorldAxis(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(...position).angleTo(new THREE.Vector3(0, 0, -1)) *
        (Math.sign(position[1]) || 1)
    )

    this.group.rotation.set(this.group.rotation.x + Math.PI / 8, 0, 0)
  }

  animate() {}
}

export default class Biomes {
  constructor(scene, camera) {
    this.scene = scene
    this.biomes = [
      new TreeBiome(scene, camera, [0, 0, -6]),
      new TreeBiome(scene, camera, [0, 0, -6]),
      new TreeBiome(scene, camera, [0, 0, -6]),
      new TreeBiome(scene, camera, [0, 0, -6])
    ]
    this.currentIndex = 0
    this.biomes[this.currentIndex].setScene()
    this.lastRotateTime = 0
    this.environment = new EnvironmentBiome(scene, camera)
    this.environment.setScene()
    this.renderCurrentBiome()
  }

  removeBiome(i) {
    const coords = { y: this.biomes[i].group.position.y }
    new TWEEN.Tween(coords)
      .to({ y: -10 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        this.biomes[i].group.position.y = coords.y
      })
      .start()
    setTimeout(() => this.scene.remove(this.biomes[i].group), 1000)
  }

  renderCurrentBiome() {
    this.biomes[this.currentIndex].group.position.y = 10
    this.scene.add(this.biomes[this.currentIndex].group)
    const coords = { y: this.biomes[this.currentIndex].group.position.y }
    new TWEEN.Tween(coords)
      .to({ y: 0 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        this.biomes[this.currentIndex].group.position.y = coords.y
      })
      .start()
  }

  getCurrent() {
    return this.biomes[this.currentIndex]
  }

  animate() {
    this.biomes.forEach(biome => biome.animate())
    this.environment.animate()
  }

  next() {
    if (Date.now() - this.lastRotateTime > 1000) {
      this.removeBiome(this.currentIndex)
      this.currentIndex = (this.currentIndex + 1) % this.biomes.length
      this.renderCurrentBiome()
      this.lastRotateTime = Date.now()
    }
  }
}
