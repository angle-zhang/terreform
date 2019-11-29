import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

const unloadedModels = [
  'forestbiome-bottom',
  'forestbiome-top',
  'rock-1',
  'rock-2',
  'rock-3',
  'tree-1',
  'tree-2',
  'tree-3',
  'tree-4'
]

const loadModel = name => {
  return new Promise((resolve, reject) => {
    new GLTFLoader().load(
      `./models/${name}.glb`,
      gltf => {
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
    modelMap[modelName] = loadModel(modelName)
  }))
  return modelMap
}
