import SceneManager from './SceneManager';
import getModel from './ModelLoader';

const loadItem = async (name) => {
  let model = await getModel(name);
  scene.add(model)
  console.log('loading...')
}


export default async (containerElement, options) => {
  const canvas = createCanvas(document, containerElement);
  const sceneManager = await SceneManager(canvas, options);
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
