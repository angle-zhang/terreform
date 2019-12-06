import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const unloadedModels = [
  'forest-biome-bottom',
  'forest-biome-top',
  'rock-1',
  'rock-2',
  'rock-3',
  'tree-1',
  'tree-2',
  'tree-3',
  'tree-4',
  'bird',
  'marine-biome-top',
  'marine-biome-bottom',
  'marine-biome-water',
  'seaweed-1',
  'seaweed-2',
  'coral-1',
  'coral-2',
  'agri-biome-top',
  'agri-biome-bottom',
  'solar-panel',
  'crops',
  'well',
  'coral-shelf'
]

const loadModel = name => {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(
      `./models/${name}.glb`,
      gltf => {
        if (gltf.scene.children.length > 1) {
          const group = new THREE.Object3D()
          for (let i = gltf.scene.children.length - 1; i >= 0; i--) {
            group.add(gltf.scene.children[i])
          }
          resolve(group)
        }
        resolve(gltf.scene.children[0])
      },
      () => { },
      err => {
        reject('An error occurred!' + err)
      }
    )
  })
}

export let loadedModels = null

export const loadModels = async () => {
  loadedModels = await loadAll(unloadedModels)
}

const loadAll = async modelNames => {
  const modelMap = {}
  await Promise.all(modelNames.map(async modelName => {
    modelMap[modelName] = await loadModel(modelName)
  }))
  return modelMap
}
