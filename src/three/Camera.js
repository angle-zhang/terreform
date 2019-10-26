import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

export default class Camera {
  constructor(camera) {
    this.camera = camera
  }

  get() {
    return this.camera
  }

  setAspect(newAspect) {
    this.camera.aspect = newAspect
    this.camera.updateProjectionMatrix()
  }

  pan({
    x = this.camera.position.x,
    y = this.camera.position.y,
    z = this.camera.position.z
  } = {}) {
    // console.log(TWEEN)
    const coords = {
      x: this.camera.position.x,
      y: this.camera.position.y,
      z: this.camera.position.z
    }
    new TWEEN.Tween(coords)
      .to({ x, y, z }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        this.camera.position.set(coords.x, coords.y, coords.z)
      })
      .start()
  }
}
