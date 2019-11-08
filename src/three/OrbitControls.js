export default class OrbitControls {
  constructor(mesh) {
    this.mesh = mesh;
    this.bindEventListeners();
    this.prevX = null;
    this.prevY = null;
  }

  bindEventListeners() {
    const handleMouseMove = (event) => {
      const dx = event.screenX - this.prevX;
      const dy = event.screenY - this.prevY;
      this.mesh.rotation.y += dx / 100;
      this.mesh.rotation.x += dy / 100;
      this.prevX = event.screenX;
      this.prevY = event.screenY;
    };

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
