import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { loadedModels } from './ModelLoader.js'
import Chance from 'chance'

import { groupVertices, sampleVertices, sample } from './Vertices'

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
          0.1
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

class StandardBiome extends Biome {
  constructor(scene, camera, options) {
    super(scene, camera)
    const {
      color,
      position,
      models,
      objectCount,
      gridSize,
      bounds,
      scale
    } = options
    this.color = color
    this.models = models
    this.objectCount = objectCount
    this.gridSize = gridSize
    this.bounds = bounds
    this.scale = scale
    this.chance = new Chance(10)
    this.setObjects(position)
  }

  setScene() {
    const oldColor = this._scene.background
    const duration = 1000
    new TWEEN.Tween(oldColor)
      .to(new THREE.Color(this.color), duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => (this._scene.background = oldColor))
      .start()
  }

  // Returns [mesh, vertices]
  getIslandMesh() {
    throw new TypeError(
      'Class(es) extending the StandardBiome abstract class are missing the getIslandMesh method.'
    )
  }

  positionGroup(position) {
    this.group.position.set(...position)
    // this.group.scale.set(this.scale)
    this.group.rotation.set(this.group.rotation.x + Math.PI / 8, 0, 0)
  }

  setObjects(position) {
    this.group = new THREE.Object3D()
    const [mesh, rawVertices] = this.getIslandMesh()
    this.group.add(mesh)
    this.group = mesh

    const vertices = groupVertices(rawVertices)
    const randomVertices = sample(
      vertices,
      this.objectCount,
      this.gridSize,
      this.bounds
    )
    randomVertices.forEach(([x, y, z]) => {
      const model = this.models[
        this.chance.weighted(
          Array(this.models.length)
            .fill()
            .map((_v, idx) => idx),
          this.models.map(({ frequency }) => frequency)
        )
      ]
      const object = loadedModels[model.name].clone()
      object.castShadow = true
      const scaleMultiplier = chance.floating({ min: 0.9, max: 1.1 })
      object.scale.set(...model.scale.map(v => v * scaleMultiplier))
      object.position.set(x, y, z)
      this.group.add(object)
    })

    this.group.position.set(...position)
    this.group.scale.set(this.scale, this.scale, this.scale)
    this.group.rotation.set(this.group.rotation.x + Math.PI / 8, 0, 0)
  }

  removeScene() {}

  animate() {}
}

class ForestBiome extends StandardBiome {
  constructor(scene, camera, position) {
    super(scene, camera, {
      position,
      color: 0x8dd7d4,
      models: [
        { name: 'rock-1', scale: [0.02, 0.02, 0.02], frequency: 1 },
        { name: 'rock-2', scale: [0.033, 0.033, 0.033], frequency: 1 },
        { name: 'rock-3', scale: [0.017, 0.017, 0.017], frequency: 1 },
        { name: 'tree-1', scale: [0.01, 0.01, 0.01], frequency: 2 },
        { name: 'tree-2', scale: [0.01, 0.01, 0.01], frequency: 2 },
        { name: 'tree-3', scale: [0.01, 0.01, 0.01], frequency: 2 },
        { name: 'tree-4', scale: [0.01, 0.01, 0.01], frequency: 2 }
      ],
      objectCount: 50,
      gridSize: [18, 18],
      bounds: [
        [-1 + 2 / 19, 1 - 2 / 19],
        [-1 + 2 / 19, 1 - 2 / 19]
      ],
      scale: 3
    })
  }

  getIslandMesh() {
    const island = new THREE.Object3D()
    const top = loadedModels['forest-biome-top'].clone()
    top.receiveShadow = true
    island.add(top)
    const bottom = loadedModels['forest-biome-bottom'].clone()
    island.add(bottom)
    return [island, top.geometry.attributes.position.array]
  }
}

class MarineBiome extends StandardBiome {
  constructor(scene, camera, position) {
    super(scene, camera, {
      position,
      color: 0x8dd7d4,
      models: [
        { name: 'seaweed-1', scale: [0.06, 0.06, 0.06], frequency: 2 },
        { name: 'seaweed-2', scale: [0.06, 0.06, 0.06], frequency: 2 },
        { name: 'coral-1', scale: [0.15, 0.15, 0.15], frequency: 2 },
        { name: 'coral-2', scale: [0.15, 0.15, 0.15], frequency: 2 }
      ],
      objectCount: 50,
      gridSize: [18, 18],
      bounds: [
        [-6.8, 6.8],
        [-6.8, 6.8]
      ],
      scale: 0.33
    })
  }

  getIslandMesh() {
    const island = new THREE.Object3D()
    const top = loadedModels['marine-biome-top'].clone()
    island.add(top)
    const bottom = loadedModels['marine-biome-bottom'].clone()
    bottom.receiveShadow = true
    island.add(bottom)
    const water = loadedModels['marine-biome-water'].clone()
    water.position.set(0, 4, 0)
    island.add(water)
    return [island, top.geometry.attributes.position.array]
  }
}

class AgricultureBiome extends StandardBiome {
  constructor(scene, camera, position) {
    super(scene, camera, {
      position,
      color: 0x8dd7d4,
      models: [{ name: 'crops', scale: [1, 1, 1], frequency: 1 }],
      objectCount: 50,
      gridSize: [8, 20],
      bounds: [
        [-1 + 2 / 21, 1 - 12 / 21],
        [-1 + 2 / 21, 1 - 2 / 21]
      ],
      scale: 3
    })
  }

  getIslandMesh() {
    const island = new THREE.Object3D()
    const top = loadedModels['agri-biome-top'].clone()
    top.scale.set(1, 1, 1)
    top.children[0].receiveShadow = true
    island.add(top)
    const bottom = loadedModels['agri-biome-bottom'].clone()
    bottom.scale.set(1, 1, 1)
    island.add(bottom)
    const well = loadedModels['well'].clone()
    well.scale.set(1, 1, 1)
    island.add(well)
    return [island, top.children[0].geometry.attributes.position.array]
  }
}

export default class Biomes {
  constructor(scene, camera) {
    this.scene = scene
    this.biomes = [
      new ForestBiome(scene, camera, [0, 0, -6]),
      new AgricultureBiome(scene, camera, [0, 0, -6]),
      new MarineBiome(scene, camera, [0, 0, -6])
    ]
    this.currentIndex = 0
    this.biomes[this.currentIndex].setScene()
    this.lastRotateTime = 0
    this.environment = new EnvironmentBiome(scene, camera)
    this.environment.setScene()
    this.renderCurrentBiome()
  }

  removeBiome(i) {
    const biome = this.biomes[i]
    const coords = { y: this.biomes[i].group.position.y }
    biome.removeScene()
    new TWEEN.Tween(coords)
      .to({ y: -10 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        biome.group.position.y = coords.y
      })
      .start()
    setTimeout(() => this.scene.remove(biome.group), 1000)
  }

  renderCurrentBiome() {
    const biome = this.biomes[this.currentIndex]
    biome.group.position.y = 10
    biome.setScene()
    this.scene.add(biome.group)
    const coords = { y: biome.group.position.y }
    new TWEEN.Tween(coords)
      .to({ y: 0 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        biome.group.position.y = coords.y
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
