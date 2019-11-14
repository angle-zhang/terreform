import SceneManager from './SceneManager';
export default (containerElement, options) => {
  const canvas = createCanvas(document, containerElement);
  const sceneManager = new SceneManager(canvas, options);
  bindEventListeners();
  render();
  function createCanvas(document, containerElement) {
    const canvas = document.createElement('canvas');
    containerElement.appendChild(canvas);
    return canvas;
  }
  function bindEventListeners() {
    window.onresize = resizeCanvas;
    resizeCanvas();
  }
  function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    sceneManager.onWindowResize(canvas);
  }
  function render(time) {
    requestAnimationFrame(render);
    sceneManager.update();
  }
}
