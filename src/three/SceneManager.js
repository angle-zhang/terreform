import * as THREE from 'three';
export default canvas => {
  const scene = buildScene(); 
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions); 
  const sceneSubjects = createSceneSubjects(scene);
  function buildScene() { //... }
  function buildRender({ width, height }) { //... }
  function buildCamera({ width, height }) { //... }
  function createSceneSubjects(scene) { //... }
  function update() { //... }
  function onWindowResize() { //... }
  return {
    update,
    onWindowResize
  }
}
