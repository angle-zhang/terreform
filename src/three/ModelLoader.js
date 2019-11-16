import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

models = ['']

function loadModel(name) {
    return new Promise((resolve, reject) => {
        new GLTFLoader().load(`./${name}.glb`,
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


export 