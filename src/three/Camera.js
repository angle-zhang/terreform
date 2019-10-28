import * as THREE from 'three'
import TWEEN from '@tweenjs/tween.js'

THREE.PerspectiveCamera.prototype.setAspect = function(newAspect) {
  this.aspect = newAspect
  this.updateProjectionMatrix()
}

THREE.PerspectiveCamera.prototype.pan = function({
  x = this.position.x,
  y = this.position.y,
  z = this.position.z
} = {}) {
  const coords = {
    x: this.position.x,
    y: this.position.y,
    z: this.position.z
  }
  new TWEEN.Tween(coords)
    .to({ x, y, z }, 1000)
    .easing(TWEEN.Easing.Quadratic.Out)
    .onUpdate(() => {
      this.position.set(coords.x, coords.y, coords.z)
    })
    .start()
}
