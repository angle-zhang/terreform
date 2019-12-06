import * as THREE from 'three'

export default class Dot {
  constructor({ radius, position: [x, y, z], raycaster, camera, handleClick }) {
    this.setObjects(radius, [x, y, z])
    this.radius = radius
    this.bindEventListeners(raycaster, camera, handleClick)
    this.intersecting = false
  }

  bindEventListeners(raycaster, camera, handleClick) {
    this.mouse = new THREE.Vector2()

    const doesIntersect = event => {
      const mouse = new THREE.Vector2(
        (event.clientX / window.innerWidth) * 2 - 1,
        -(event.clientY / window.innerHeight) * 2 + 1
      )
      raycaster.setFromCamera(mouse, camera)

      const intersects = raycaster.intersectObject(this.area)
      return intersects.length > 0
    }

    const handleMouseMove = event => {
      if (doesIntersect(event)) {
        this.intersecting = true
        this.ring.material.color.set(0xdddddd)
        if (document.body.style.cursor != 'pointer') {
          document.body.style.cursor = 'pointer'
        }
      } else if (this.intersecting) {
        this.ring.material.color.set(0xffffff)
        document.body.style.cursor = 'default'
        this.intersecting = false
      }
    }

    const handleMouseDown = event => {
      if (doesIntersect(event)) {
        handleClick()
      }
    }

    document.addEventListener('mousemove', handleMouseMove, false)
    document.addEventListener('mousedown', handleMouseDown, false)

    this.removeEventListeners = () => {
      document.removeEventListener('mousemove', handleMouseMove, false)
      document.removeEventListener('mousedown', handleMouseDown, false)
    }
  }

  setObjects(radius, [x, y, z]) {
    const ringGeometry = new THREE.RingGeometry(0.8 * radius, radius, 32)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      opacity: 0.7,
      transparent: true
    })
    this.ring = new THREE.Mesh(ringGeometry, ringMaterial)
    this.ring.position.set(x, y, z)

    const areaGeometry = new THREE.CircleGeometry(radius * 1.25, 16)
    const areaMaterial = new THREE.MeshBasicMaterial({ visible: false })
    this.area = new THREE.Mesh(areaGeometry, areaMaterial)
    this.area.position.set(x, y, z)
  }

  render(scene) {
    scene.add(this.ring)
    scene.add(this.area)
  }

  update(time) {
    const scale = 0.9 + Math.sin(time / 20) / 10
    this.ring.scale.x = scale
    this.ring.scale.y = scale
    this.ring.scale.z = scale
  }
}
