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

export const getNodes = (poissonNodes, vertices) => {
    let nodes = []
    poissonNodes.forEach((p_node, j) => {
        let min = Math.hypot(p_node[0] - vertices[0][0], p_node[1] - vertices[0][2])
        let y = vertices[1][0]
        vertices[0].forEach((coord, j) => {
            let del_x = p_node[0] - vertices[0][j]
            let del_z = p_node[1] - vertices[2][j]
            let d = Math.hypot(del_x, del_z)
            if (d < min) {
                min = d
                y = vertices[1][i]
            }
        })
        let node = [p_node[0], y, p_node[1]]
        nodes.push(node)
    })
    return nodes
}