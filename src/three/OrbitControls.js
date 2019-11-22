import * as THREE from 'three'

export default class OrbitControls {
  constructor(group) {
    this.group = group
    this.bindEventListeners()
    this.prevX = null
  }

  bindEventListeners() {
    const handleMouseMove = event => {
      const dx = event.screenX - this.prevX
      // console.log(this.group.getWorldDirection())
      // this.group.rotation.y += dx / 100
      this.group.rotateOnAxis(new THREE.Vector3(0, 1, 0), dx / 100)
      this.prevX = event.screenX
    }

    document.addEventListener('mousedown', (event) => {
      this.prevX = event.screenX;
      this.prevY = event.screenY;
      document.addEventListener('mousemove', handleMouseMove);
    });

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove);
    });
  }
}
