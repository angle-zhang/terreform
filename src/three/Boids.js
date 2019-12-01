import * as THREE from 'three'

export class Flock {
  constructor(count, bounds, velocityMagnitude) {
    this.bounds = bounds
    this.boids = new Array(count)
      .fill()
      .map(
        () =>
          new Boid(
            [
              Math.random() * (bounds[0][1] - bounds[0][0]) + bounds[0][1],
              Math.random() * (bounds[1][1] - bounds[1][0]) + bounds[1][1],
              -10
            ],
            velocityMagnitude
          )
      )
  }

  render(scene) {
    this.boids.forEach(boid => scene.add(boid.mesh))
  }

  remove(scene) {
    this.boids.forEach(boid => scene.remove(boid.mesh))
  }

  update() {
    this.boids.forEach((boid, i) => {
      const v1 = this.ruleCoM(i)
      v1.divideScalar(400)
      const v2 = this.ruleVel(i)
      v2.divideScalar(30)
      const v3 = this.ruleSep(i)
      v3.divideScalar(150)
      const v = v1.add(v2).add(v3)
      boid.addVelocity(v.x, v.y)
      boid.updatePosition(this.bounds[0], this.bounds[1])
    })
  }

  ruleCoM(i) {
    const v = new THREE.Vector2(0, 0)
    this.boids.forEach((boid, j) => {
      if (i != j) {
        v.x += boid.getPosition().x
        v.y += boid.getPosition().y
      }
    })
    v.divideScalar(this.boids.length - 1)
    v.sub(this.boids[i].getPosition())
    return v
  }

  ruleSep(i) {
    const v = new THREE.Vector2(0, 0)
    this.boids.forEach((boid, j) => {
      if (i != j) {
        const dx = boid.getPosition().x - this.boids[i].getPosition().x
        const dy = boid.getPosition().y - this.boids[i].getPosition().y
        if (Math.hypot(dx, dy) < 0.75) {
          v.x -= dx
          v.y -= dy
        }
      }
    })
    return v
  }

  ruleVel(i) {
    const v = new THREE.Vector2(0, 0)
    this.boids.forEach((boid, j) => {
      if (i != j) {
        const dx = boid.getPosition().x - this.boids[i].getPosition().x
        const dy = boid.getPosition().y - this.boids[i].getPosition().y
        if (Math.hypot(dx, dy) < 5) {
          v.x += boid.velocity.x
          v.y += boid.velocity.y
        }
      }
    })
    v.divideScalar(this.boids.length - 1)
    v.sub(this.boids[i].velocity)
    return v
  }
}

class Boid {
  constructor([x, y, z], velocityMagnitude) {
    this.mesh = this.createMesh(x, y, z)
    this.velocityMagnitude = velocityMagnitude
    this.velocity = new THREE.Vector2(0, 0)
    this.initVelocity()
  }

  getPosition() {
    return this.mesh.position
  }

  createMesh(x, y, z) {
    const geometry = new THREE.ConeGeometry(0.1, 0.5)
    const material = new THREE.MeshPhongMaterial({
      color: 0x77ccff
    })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.position.set(x, y, z)
    return mesh
  }

  initVelocity() {
    const vx = Math.random() * 2 - 1
    const vy = Math.sqrt(1 - vx ** 2) * Math.sign(Math.random() - 0.5)
    this.updateVelocity(vx, vy)
  }

  addVelocity(vx, vy) {
    this.updateVelocity(this.velocity.x + vx, this.velocity.y + vy)
  }

  updateVelocity(vx, vy) {
    this.velocity.x = vx
    this.velocity.y = vy
    this.velocity.normalize()
    this.velocity.multiplyScalar(this.velocityMagnitude)
    this.mesh.rotation.z = Math.atan2(vy, vx) - Math.PI / 2
  }

  updatePosition([xMin, xMax], [yMin, yMax]) {
    // This mod function works for negatives
    const mod = (x, y) => ((x % y) + y) % y
    this.mesh.position.x =
      mod(this.mesh.position.x + this.velocity.x - xMin, xMax - xMin) + xMin
    this.mesh.position.y =
      mod(this.mesh.position.y + this.velocity.y - yMin, yMax - yMin) + yMin
  }
}
