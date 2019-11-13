import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

import {Flock} from './Boids.js'

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

// a starter biome class
class StarterBiome extends Biome {
  constructor(scene, camera, position) {
    super(scene, camera)
    this.setObjects(position)
    this.birds = []
  }

  setScene() {
    const color = this._scene.background
    new TWEEN.Tween(color)
      .to(new THREE.Color(Math.random(), Math.random(), Math.random()), 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => (this._scene.background = color))
      .start()

    this.flocks = new Array(3).fill().map(() => new Flock(20, [[-15, 25], [-10, 10]], 0.1))
    this.flocks.forEach(flock => flock.render(this._scene))
  }

  setObjects(position) {
    const geometry = new THREE.BoxGeometry(1.5, 4, 1.5)
    const material = new THREE.MeshPhongMaterial({ color: 0x777777 })
    this.group = new THREE.Mesh(geometry, material)
    this._scene.add(this.group)
    this.group.position.set(...position)
    // This is needed since world and local rotation is separate, and all the
    // biomes are put into a group, which does not affect local rotation
    this.group.rotateOnWorldAxis(
      new THREE.Vector3(1, 0, 0),
      new THREE.Vector3(...position).angleTo(new THREE.Vector3(0, 0, -1)) *
        (Math.sign(position[1]) || 1)
    )
  }

  animate() {
    if (this.flocks) {
      this.flocks.forEach(flock => flock.update())
    }
  }
}

export default class Biomes {
  constructor(scene, camera) {
    this.group = new THREE.Object3D()
    this.biomes = [
      new StarterBiome(scene, camera, [0, 0, -6]),
      new StarterBiome(scene, camera, [0, -6, 0]),
      new StarterBiome(scene, camera, [0, 0, 6]),
      new StarterBiome(scene, camera, [0, 6, 0])
    ]
    this.biomes.forEach(biome => this.group.add(biome.group))
    scene.add(this.group)
    this.currentIndex = 0
    this.biomes[this.currentIndex].setScene()
    this.lastRotateTime = 0
  }

  getCurrent() {
    return this.biomes[this.currentIndex]
  }

  animate() {
    this.biomes.forEach(biome => biome.animate())
  }

  next() {
    const DURATION = 1000
    if (Date.now() - this.lastRotateTime > 1000) {
      const coords = { x: this.group.rotation.x }
      new TWEEN.Tween(coords)
        .to({ x: this.group.rotation.x + Math.PI / 2 }, DURATION)
        .easing(TWEEN.Easing.Quadratic.Out)
        .onUpdate(() => {
          this.group.rotation.x = coords.x
          this.getCurrent().group.updateMatrixWorld()
        })
        .start()
      this.currentIndex = (this.currentIndex + 1) % this.biomes.length
      this.lastRotateTime = Date.now()
      this.getCurrent().setScene()
    }
  }
}
