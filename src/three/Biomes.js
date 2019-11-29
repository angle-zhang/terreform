import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'
import { loadedModels } from './ModelLoader.js'

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

    // Add clouds in random positions
    const clouds = []
    for (let i = 0; i < 15; i++) {
      const cloud = createCloud(Math.random() * 5 + 3)
      const x = Math.random() * 60 - 30
      const z = Math.sign(Math.random() - 0.5) * Math.sqrt(30 ** 2 - x ** 2)
      cloud.position.set(
        x,
        Math.random() * 15 - 10,
        z
      )
      cloud.rotation.y = Math.atan2(x, z)
      clouds.push(cloud)
    }
    this.clouds = new THREE.Object3D()
    clouds.forEach(cloud => this.clouds.add(cloud))
    this._scene.add(this.clouds)

    this.flocks = new Array(2)
      .fill()
      .map(() => new Flock(10, [[-15, 25], [-10, 10]], 0.1))
    this.flocks.forEach(flock => flock.render(this._scene))
  }

  removeScene() {
    if (this.flocks) {
      this.flocks.forEach(flock => flock.remove(this._scene))
    }
    if (this.clouds) {
      this._scene.remove(this.clouds)
    }
  }

  setObjects(position) {
    this.group = loadedModels['tree-1'].clone()
    this.group.scale.set(0.2, 0.2, 0.2)
    this.group.position.set(...position)
    var geometry = new THREE.BoxBufferGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( { color: 0xffff00 } );
    var mesh = new THREE.Mesh( geometry, material );
    mesh.position.set(...position)
    this._scene.add( mesh );

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
    if (this.clouds) {

      this.clouds.rotateY(0.0005)
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

  // async loadItem(name) {
  //   let model = await getModel(name);
  //   scene.add(model)
  //   console.log('loading...')
  // }

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
      this.getCurrent().removeScene()
      this.currentIndex = (this.currentIndex + 1) % this.biomes.length
      this.lastRotateTime = Date.now()
      this.getCurrent().setScene()
    }
  }
}
