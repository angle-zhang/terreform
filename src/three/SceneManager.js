import * as THREE from 'three';
import Biomes from './Biomes.js';

// scene manager class
export default canvas => {
  const screenDimensions = {
    width: window.innerWidth,
    height: window.innerHeight
  }
  const scene = buildScene();
  const renderer = buildRender(screenDimensions);
  const camera = buildCamera(screenDimensions);
  const biomes = createBiomes(scene, camera);
  function buildScene() {
    return new THREE.Scene();
  }
  function buildRender({ width, height }) {
    let webgl = new THREE.WebGLRenderer({ "canvas": canvas });
    webgl.setSize(width, height);
    return webgl;
  }
  function buildCamera({ width, height }) {
    return new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  }
  function createBiomes(scene, camera) {
    return new Biomes(scene, camera);
  }
  function loadModel(name) {
    let loader = new THREE.GLTFLoader()
    loadString = `models/${name}/${name}.gltf` // depends on our directory structure for models
    loader.load(
      loadString, (gltf) => {
        scene.add(gltf.scene)
        // Model settings
        // gltf.animations
        // gltf.scene
        // gltf.scenes
        // gltf.cameras
        // gltf.asset
      }, (xrh) => {
        console.log((xhr.loaded / xhr.total * 100) + '% loaded');
      }, (err) => {
        console.log('An error occurred!')
      }
    )
  }
  function update() {
    // only update active scene
    biomes.starterBiome.animate();
    renderer.render(scene, camera);
  }
  function onWindowResize({ width, height }) {
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  }
  return {
    update,
    onWindowResize
  }
}
