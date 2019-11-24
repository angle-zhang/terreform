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

export const loadModel = name => {
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

const loadAll = modelNames => {
  const modelMap = {}
  modelNames.map(async modelName => {
    modelMap[modelName] = await loadModel(modelName)
  })
  return modelMap
}

export const loadedModels = loadAll(unloadedModels)
