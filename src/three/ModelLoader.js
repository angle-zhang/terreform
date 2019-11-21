import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const unloadedModels = ['forestbiome-bottom', 'forestbiome-top', 'rock-1', 'rock-2', 'rock-3', 'tree-1', 'tree-2', 'tree-3', 'tree-4']

function loadModel(name) {
    return new Promise((resolve, reject) => {
        new GLTFLoader().load(`./models/${name}.glb`,
            gltf => {
                resolve(gltf.scene.children[0])
            },
            () => {
            },
            err => {
                reject('An error occurred!' + err)
            })
    })
}

export async function getModel(name) {
    return await loadModel(name)
}

const loadAll = (modelNames) => {
    let modelMap = new Map()
    modelNames.forEach(async (modelName) => modelMap.set(modelName, await getModel(modelName)))
    return modelMap
}

export const loadedModels = loadAll(unloadedModels)
