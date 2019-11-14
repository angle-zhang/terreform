import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

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

async function getModel(name) {
    return await loadModel(name)
}

export default getModel