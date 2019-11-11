export default class OrbitControls {
  constructor(group) {
    this.group = group
    this.bindEventListeners()
    this.prevX = null
  }

  bindEventListeners() {
    const handleMouseMove = event => {
      const dx = event.screenX - this.prevX
      this.group.rotation.y += dx / 100
      this.prevX = event.screenX
    }

    document.addEventListener('mousedown', event => {
      this.prevX = event.screenX
      document.addEventListener('mousemove', handleMouseMove)
    })

    document.addEventListener('mouseup', () => {
      document.removeEventListener('mousemove', handleMouseMove)
    })
  }
}
