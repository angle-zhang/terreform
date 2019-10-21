import * as THREE from 'three';
export default canvas => {
  const screenDimensions = { 
    width: canvas.scrollWidth, 
    height: canvas.scrollHeight
  }
  const scene = buildScene(); 
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions); 
  const sceneSubjects = createSceneSubjects(scene);
  function buildScene() { 
    // scene env   
    return new THREE.Scene();
  }
  function buildRender({ width, height }) {  

  }
  function buildCamera({ width, height }) {  

  }
  function createSceneSubjects(scene) {  

  }
  function update() {
    // update on each request animation frame
  }
  function onWindowResize() { 

  }
  return {
    update,
    onWindowResize
  }
}
