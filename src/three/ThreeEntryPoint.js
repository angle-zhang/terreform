import SceneManager from './SceneManager';

export default async (containerElement, options, renderPopup, donationIds) => {
  const canvas = createCanvas(document, containerElement);
  const sceneManager = await SceneManager(canvas, options, renderPopup, donationIds);
  bindEventListeners();
  render();

  function createCanvas(document, containerElement) {
    const canvas = document.createElement('canvas')
    containerElement.appendChild(canvas)
    return canvas
  }
  function bindEventListeners() {
    window.onresize = resizeCanvas
    resizeCanvas()
    // document.onclick = onClick
  }
  // function onClick() {
  //   console.log('clicking from entrypoint!')
  // }

  function resizeCanvas() {
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    sceneManager.onWindowResize(canvas);
  }
  function render(time) {
    requestAnimationFrame(render)
    sceneManager.update()
  }
  return sceneManager.callbacks
}
