export const separateCoordinates = (mesh) => {
    let x = []
    let y = []
    let z = []
    mesh.geometry.attributes.position.array.forEach((coord, i) => {
        switch (i % 3) {
            case 0:
                x.push(coord)
                break
            case 1:
                y.push(coord)
                break
            case 2:
                z.push(coord)
                break
        }
    })
    return [x, y, z]
}

export const getBounds = (coords) => {
    let x = coords[0]
    let z = coords[2]
    x.sort((a, b) => a - b)
    z.sort((a, b) => a - b)
    return [x[0], x[x.length - 1], z[0], z[z.length - 1]]
}

export const getPosition = (object) => {
    let vec = new THREE.Vector3()
    object.getWorldPosition(vec)
    console.log('The location of the object is ' + JSON.stringify(vec))
}

export const getScale = (object) => {
    let vec = new THREE.Vector3()
    object.getWorldScale(vec)
    console.log('The scale of the object is ' + JSON.stringify(vec))
}