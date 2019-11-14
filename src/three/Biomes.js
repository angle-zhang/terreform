import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import getModel from './ModelLoader.js'

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
    this.setScene()
    this.setObjects(position)
  }

  setScene() { }

  setObjects(position) {
    var geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5)
    var material = new THREE.MeshPhongMaterial({ color: 0xaaaaff })
    this.group = new THREE.Mesh(geometry, material)
    this.group.position.set(...position)
  }

  animate() { }
}

export default class Biomes {
  constructor(scene, camera) {
    this.group = new THREE.Group()
    this.biomes = [
      new StarterBiome(scene, camera, [0, 0, -6]),
      new StarterBiome(scene, camera, [6, 0, 0]),
      new StarterBiome(scene, camera, [0, 0, 6]),
      new StarterBiome(scene, camera, [-6, 0, 0])
    ]
    this.biomes.forEach(biome => this.group.add(biome.group))
    scene.add(this.group)
    this.currentIndex = 0
  }

  // async loadItem(name) {
  //   let model = await getModel(name);
  //   scene.add(model)
  //   console.log('loading...')
  // }

  getCurrent() {
    return this.biomes[this.currentIndex]
  }

  animate() {
    this.biomes.forEach(biome => biome.animate)
  }

  next() {
    const coords = { y: this.group.rotation.y }
    new TWEEN.Tween(coords)
      .to({ y: this.group.rotation.y + Math.PI / 2 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        this.group.rotation.y = coords.y
      })
      .start()
    this.currentIndex = (this.currentIndex + 1) % this.biomes.length
  }
}
