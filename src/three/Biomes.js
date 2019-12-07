import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js';
import { loadedModels } from './ModelLoader.js';
import Chance from 'chance';

import { groupVertices, sample } from './Vertices';

import { Flock } from './Boids.js';
import { createCloud } from './Clouds.js';

function createClone(modelName) {
  return loadedModels[modelName].clone();
  // const model = loadedModels[modelName]
  // if (model.children.length > 0) {
  //   return model.clone()
  // }
  // return new THREE.Mesh(model.geometry, model.material.clone())
}

const castShadow = (mesh) => {
  mesh.castShadow = true;
  mesh.children.forEach((child) => {
    castShadow(child);
  });
};

// define scene classes here
// pseudo abstract class
class Biome {
  constructor(scene, camera) {
    this._scene = scene;
    this._camera = camera;
    if (this.constructor === Biome) {
      throw new TypeError(
        'Abstract class Biome cannot be instantiated directly.'
      );
    }
  }

  setScene() {
    // set scene and camera variables : background color, camera position, etc.
    throw new TypeError(
      'Class(es) extending the biome abstract class are missing the setScene method.'
    );
  }

  setObjects() {
    // create and add scene objects
    throw new TypeError(
      'Class(es) extending the biome abstract class are missing the setObjects method.'
    );
  }

  animate() {
    // update objects by animation frame
    throw new TypeError(
      'Class(es) extending the biome abstract class are missing the animate method.'
    );
  }
}

class EnvironmentBiome extends Biome {
  constructor(scene, camera) {
    super(scene, camera);
    this.setObjects();
  }

  setScene() {
    // Add clouds in random positions
    const clouds = [];
    for (let i = 0; i < 20; i++) {
      const cloud = createCloud(Math.random() * 4 + 2);
      const x = Math.random() * 60 - 30;
      const z = Math.sign(Math.random() - 0.5) * Math.sqrt(30 ** 2 - x ** 2);
      cloud.position.set(x, Math.random() * 25 - 10, z);
      cloud.rotation.y = Math.atan2(x, z);
      clouds.push(cloud);
    }
    this.clouds = new THREE.Object3D();
    clouds.forEach((cloud) => this.clouds.add(cloud));
    this._scene.add(this.clouds);

    this.flocks = new Array(2)
      .fill()
      .map(() => new Flock(10, [[-25, 45], [-10, 10]], 0.1));
    this.flocks.forEach((flock) => flock.render(this._scene));
  }

  setObjects() {}

  removeScene() {
    if (this.flocks) {
      this.flocks.forEach((flock) => flock.remove(this._scene));
    }
    if (this.clouds) {
      this._scene.remove(this.clouds);
    }
  }

  animate() {
    if (this.flocks) {
      this.flocks.forEach((flock) => flock.update());
    }
    if (this.clouds) {
      this.clouds.rotateY(0.0005);
    }
  }
}

// class TreeBiome extends Biome {
//   constructor(scene, camera, position, treeDonationIds) {
class StandardBiome extends Biome {
  constructor(scene, camera, options, donationIds) {
    super(scene, camera);
    const {
      color,
      position,
      models,
      objectModels,
      otherModels,
      objectCount,
      otherCount,
      gridSize,
      bounds,
      scale
    } = options;
    this.color = color;
    this.models = models;
    this.objectModels = objectModels;
    this.otherModels = otherModels;
    this.objectCount = objectCount;
    this.otherCount = otherCount;
    this.gridSize = gridSize;
    this.bounds = bounds;
    this.scale = scale;
    this.chance = new Chance(10); // seed random donation
    this.donationIds = donationIds;
    this.setObjects(position);
    this.donationObjects = this.donationObjects.map((object, i) => {
      // console.log(object.material && object.material.color)
      return donationIds[i]
        ? {
            model: object,
            userId: donationIds[i],
            baseColor: object.material && object.material.color
          }
        : {
            model: object,
            userId: null
          };
    });
    // bounce each object 
    this.donationObjects.forEach((object) => {
      if (object.userId) {
        const bounce = () => {
          const originalCoord = object['model'].position.y;
          const coords = { y: originalCoord };
          new TWEEN.Tween(coords)
            .to({ y: object['model'].position.y + 0.05 }, 300)
            .easing(TWEEN.Easing.Circular.Out)
            .onUpdate(() => {
              object['model'].position.y = coords.y;
            })
            .start();
          setTimeout(() => {
            new TWEEN.Tween(coords)
              .to({ y: originalCoord }, 300)
              .easing(TWEEN.Easing.Circular.In)
              .onUpdate(() => {
                object['model'].position.y = coords.y;
              })
              .start();
          }, 300);
          setTimeout(() => bounce(), 3200);
        };
        bounce();
      }
    });
  }

  setScene() {
    const oldColor = this._scene.background;
    const duration = 1000;
    new TWEEN.Tween(oldColor)
      .to(new THREE.Color(this.color), duration)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => (this._scene.background = oldColor))
      .start();
  }

  // Returns [mesh, vertices]
  getIslandMesh() {
    throw new TypeError(
      'Class(es) extending the StandardBiome abstract class are missing the getIslandMesh method.'
    );
  }

  addObject(id) {
    this.objectCount += 1;
    const [mesh, rawVertices] = this.getIslandMesh();
    this.group.add(mesh);
    // this.group = mesh;
    const vertices = groupVertices(rawVertices);
    const randomVertices = sample(
      vertices,
      this.objectCount + this.otherCount,
      this.gridSize,
      this.bounds
    );
    const [x, y, z] = randomVertices[randomVertices.length - 1];
    const model = this.objectModels[
      this.chance.weighted(
        Array(this.objectModels.length)
          .fill()
          .map((_v, idx) => idx),
        this.objectModels.map((x) => x.frequency)
      )
    ];
    // const object = loadedModels[model.name].clone()
    // create clone of tree 
    const object = createClone(model.name);
    castShadow(object);
    object.castShadow = true;
    const scaleMultiplier = chance.floating({ min: 0.9, max: 1.1 });
    object.scale.set(...model.scale.map((v) => v * scaleMultiplier));
    object.position.set(x, y, z);
    // console.log(model.position)
    if (model.position) {
      object.position.x += model.position[0];
      object.position.y += model.position[1];
      object.position.z += model.position[2];
    }
    this.group.add(object);
    this.donationObjects.push(object);
    const i = this.donationObjects.length - 1;
    this.donationObjects[i] = id
      ? {
          model: object,
          userId: id,
          baseColor: object.material && object.material.color
        }
      : {
          model: object,
          userId: null
        };
    const objectDos = this.donationObjects[i];
    // bounce the new object
    const bounce = () => {
      const originalCoord = objectDos['model'].position.y;
      const coords = { y: originalCoord };
      new TWEEN.Tween(coords)
        .to({ y: objectDos['model'].position.y + 0.05 }, 300)
        .easing(TWEEN.Easing.Circular.Out)
        .onUpdate(() => {
          objectDos['model'].position.y = coords.y;
        })
        .start();
      setTimeout(() => {
        new TWEEN.Tween(coords)
          .to({ y: originalCoord }, 300)
          .easing(TWEEN.Easing.Circular.In)
          .onUpdate(() => {
            objectDos['model'].position.y = coords.y;
          })
          .start();
      }, 300);
      setTimeout(() => bounce(), 3200);
    };
    bounce();
    // returns reference to new tree
    return objectDos;
    // this.objectCount += 1;
    // const [mesh, rawVertices] = this.getIslandMesh();
    // this.group.add(mesh);
    // this.group = mesh;
    // const vertices = groupVertices(rawVertices);
    // const randomVertices = sample(
    //   vertices,
    //   this.objectCount + this.otherCount,
    //   this.gridSize,
    //   this.bounds
    // );
    // const [x, y, z] = randomVertices[randomVertices.length - 1];
    // const model = this.objectModels[
    //   this.chance.weighted(
    //     Array(this.objectModels.length)
    //       .fill()
    //       .map((_v, idx) => idx),
    //     this.objectModels.map((x) => x.frequency)
    //   )
    // ];
    // // const object = loadedModels[model.name].clone()
    // const object = createClone(model.name);
    // castShadow(object);
    // object.castShadow = true;
    // const scaleMultiplier = chance.floating({ min: 0.9, max: 1.1 });
    // object.scale.set(...model.scale.map((v) => v * scaleMultiplier));
    // object.position.set(x, y, z);
    // // console.log(model.position)
    // if (model.position) {
    //   object.position.x += model.position[0];
    //   object.position.y += model.position[1];
    //   object.position.z += model.position[2];
    // }
    // this.group.add(object);
    // this.donationObjects.push(object);
    // const i = this.donationObjects.length - 2;
    // this.donationObjects[i] = this.donationIds[i]
    //   ? {
    //       model: object,
    //       userId: this.donationIds[i],
    //       baseColor: object.material && object.material.color
    //     }
    //   : {
    //       model: object,
    //       userId: null
    //     };
    // const objectDos = this.donationObjects[i];
    // const bounce = () => {
    //   const originalCoord = objectDos['model'].position.y;
    //   const coords = { y: originalCoord };
    //   new TWEEN.Tween(coords)
    //     .to({ y: objectDos['model'].position.y + 0.05 }, 300)
    //     .easing(TWEEN.Easing.Circular.Out)
    //     .onUpdate(() => {
    //       objectDos['model'].position.y = coords.y;
    //     })
    //     .start();
    //   setTimeout(() => {
    //     new TWEEN.Tween(coords)
    //       .to({ y: originalCoord }, 300)
    //       .easing(TWEEN.Easing.Circular.In)
    //       .onUpdate(() => {
    //         objectDos['model'].position.y = coords.y;
    //       })
    //       .start();
    //   }, 300);
    //   setTimeout(() => bounce(), 3000);
    // };
    // bounce();
    // this.objectCount += 1;
    // const [, rawVertices] = this.getIslandMesh();
    // const vertices = groupVertices(rawVertices);
    // const randomVertices = sample(
    //   vertices,
    //   this.objectCount,
    //   this.gridSize,
    //   this.bounds
    // );
    // const [x, y, z] = randomVertices[randomVertices.length - 1];
    // const model = this.models[
    //   this.chance.weighted(
    //     Array(this.models.length)
    //       .fill()
    //       .map((_v, idx) => idx),
    //     this.models.map(({ frequency }) => frequency)
    //   )
    // ];
    // // const object = loadedModels[model.name].clone()
    // const object = createClone(model.name);
    // castShadow(object);
    // const scaleMultiplier = chance.floating({ min: 0.9, max: 1.1 });
    // object.scale.set(...model.scale.map((v) => v * scaleMultiplier));
    // object.position.set(x, y, z);
    // this.group.add(object);
  }

  setObjects(position) {
    this.group = new THREE.Object3D();
    const [mesh, rawVertices] = this.getIslandMesh();
    this.group.add(mesh);
    this.group = mesh;

    const vertices = groupVertices(rawVertices);
    const randomVertices = sample(
      vertices,
      this.objectCount + this.otherCount,
      this.gridSize,
      this.bounds
    );
    this.donationObjects = [];
    randomVertices.slice(this.otherCount).forEach(([x, y, z]) => {
      const model = this.objectModels[
        this.chance.weighted(
          Array(this.objectModels.length)
            .fill()
            .map((_v, idx) => idx),
          this.objectModels.map(({ frequency }) => frequency)
        )
      ];
      // const object = loadedModels[model.name].clone()
      const object = createClone(model.name);
      castShadow(object);
      // object.castShadow = true
      const scaleMultiplier = chance.floating({ min: 0.9, max: 1.1 });
      object.scale.set(...model.scale.map((v) => v * scaleMultiplier));
      object.position.set(x, y, z);
      if (model.position) {
        object.position.x += model.position[0];
        object.position.y += model.position[1];
        object.position.z += model.position[2];
      }
      this.group.add(object);
      this.donationObjects.push(object);
    });

    randomVertices.slice(0, this.otherCount).forEach(([x, y, z]) => {
      const model = this.otherModels[
        this.chance.weighted(
          Array(this.otherModels.length)
            .fill()
            .map((_v, idx) => idx),
          this.otherModels.map(({ frequency }) => frequency)
        )
      ];
      const object = loadedModels[model.name].clone();
      castShadow(object);
      // object.castShadow = true
      const scaleMultiplier = chance.floating({ min: 0.9, max: 1.1 });
      object.scale.set(...model.scale.map((v) => v * scaleMultiplier));
      object.position.set(x, y, z);
      if (model.position) {
        object.position.x += model.position[0];
        object.position.y += model.position[1];
        object.position.z += model.position[2];
      }
      this.group.add(object);
    });

    this.group.position.set(...position);
    this.group.scale.set(this.scale, this.scale, this.scale);
    this.group.rotation.set(this.group.rotation.x + Math.PI / 8, 0, 0);
  }

  removeScene() {}

  animate() {}
}

class ForestBiome extends StandardBiome {
  constructor(scene, camera, position, donationIds) {
    super(
      scene,
      camera,
      {
        position,
        color: 0x8dd7d4,
        objectModels: [
          { name: 'tree-1', scale: [0.01, 0.01, 0.01], frequency: 2 },
          { name: 'tree-2', scale: [0.01, 0.01, 0.01], frequency: 2 },
          { name: 'tree-3', scale: [0.01, 0.01, 0.01], frequency: 2 },
          {
            name: 'tree-4',
            scale: [0.01, 0.01, 0.01],
            frequency: 2,
            position: [0, -0.01, 0]
          }
        ],
        otherModels: [
          {
            name: 'rock-1',
            scale: [0.015, 0.015, 0.015],
            frequency: 1,
            position: [0, 0.03, 0]
          },
          {
            name: 'rock-2',
            scale: [0.033, 0.033, 0.033],
            frequency: 1,
            position: [0, 0, 0]
          },
          {
            name: 'rock-3',
            scale: [0.01, 0.01, 0.01],
            frequency: 1,
            position: [0, 0.03, 0]
          }
        ],
        objectCount: 50,
        otherCount: 20,
        gridSize: [18, 18],
        bounds: [[-1 + 2 / 19, 1 - 2 / 19], [-1 + 2 / 19, 1 - 2 / 19]],
        scale: 3
      },
      donationIds
    );
    this.trees = this.donationObjects;
  }

  getIslandMesh() {
    const island = new THREE.Object3D();
    const top = loadedModels['forest-biome-top'].clone();
    top.scale.set(1, 1, 1);
    top.receiveShadow = true;
    island.add(top);
    const bottom = loadedModels['forest-biome-bottom'].clone();
    island.add(bottom);
    return [island, top.geometry.attributes.position.array];
  }
}

class MarineBiome extends StandardBiome {
  constructor(scene, camera, position, donationIds) {
    super(
      scene,
      camera,
      {
        position,
        color: 0xdea8f3,
        objectModels: [
          {
            name: 'coral-1',
            scale: [0.03, 0.03, 0.03],
            frequency: 2,
            position: [0, -0.09, 0]
          },
          {
            name: 'coral-2',
            scale: [0.25, 0.25, 0.25],
            frequency: 2,
            position: [0, -0.09, 0]
          }
        ],
        otherModels: [
          {
            name: 'seaweed-1',
            scale: [0.005, 0.005, 0.005],
            frequency: 2,
            position: [0, -0.05, 0]
          },
          {
            name: 'seaweed-2',
            scale: [0.65, 0.65, 0.65],
            frequency: 2,
            position: [0, -0.075, 0]
          },
          {
            name: 'coral-shelf',
            scale: [0.17, 0.17, 0.17],
            frequency: 2,
            position: [0, -0.05, 0]
          },
          {
            name: 'rock-1',
            scale: [0.015, 0.015, 0.015],
            frequency: 1,
            position: [0, -0.03, 0]
          },
          {
            name: 'rock-2',
            scale: [0.033, 0.033, 0.033],
            frequency: 1,
            position: [0, -0.05, 0]
          },
          {
            name: 'rock-3',
            scale: [0.01, 0.01, 0.01],
            frequency: 1,
            position: [0, -0.05, 0]
          }
        ],
        objectCount: 50,
        otherCount: 30,
        gridSize: [18, 18],
        bounds: [[-1 + 2 / 19, 1 - 2 / 19], [-1 + 2 / 19, 1 - 2 / 19]],
        scale: 3
      },
      donationIds
    );
    this.sealife = this.donationObjects;
  }

  getIslandMesh() {
    const island = new THREE.Object3D();
    const top = loadedModels['marine-biome-top'].clone();
    island.add(top);
    top.receiveShadow = true;
    const bottom = loadedModels['marine-biome-bottom'].clone();
    island.add(bottom);
    const water = loadedModels['marine-biome-water'].clone();
    island.add(water);
    return [island, top.geometry.attributes.position.array];
  }

  createClone(modelName) {
    const model = loadedModels[modelName];
    return new THREE.Mesh(model.geometry, model.material.clone());
  }

  animate() {
    // this.group.rotateY()
  }
}

class AgricultureBiome extends StandardBiome {
  constructor(scene, camera, position, donationIds) {
    super(
      scene,
      camera,
      {
        position,
        color: 0xf8d1b7,
        objectModels: [
          {
            name: 'crops',
            scale: [1, 1, 1],
            frequency: 1,
            position: [0, 0.025, 0]
          }
        ],
        otherModels: [],
        objectCount: 50,
        otherCount: 0,
        gridSize: [8, 20],
        bounds: [[-1 + 2 / 21, 1 - 12 / 21], [-1 + 2 / 21, 1 - 2 / 21]],
        scale: 3
      },
      donationIds
    );
    this.crops = this.donationObjects;
  }

  getIslandMesh() {
    const island = new THREE.Object3D();
    const top = loadedModels['agri-biome-top'].clone();
    top.receiveShadow = true;
    top.children.forEach((child) => {
      child.receiveShadow = true;
    });
    // console.log(top)
    // top.children[1].receiveShadow = true
    island.add(top);
    const bottom = loadedModels['agri-biome-bottom'].clone();
    bottom.receiveShadow = true;
    island.add(bottom);
    const well = loadedModels['well'].clone();
    castShadow(well);
    island.add(well);
    const solarPanel = loadedModels['solar-panel'].clone();
    solarPanel.castShadow = true;
    castShadow(solarPanel);
    island.add(solarPanel);
    return [island, top.children[0].geometry.attributes.position.array];
  }
}

export default class Biomes {
  constructor(scene, camera, donationIds) {
    const forestDonationIds = donationIds['22098'];
    const marineDonationIds = donationIds['24410'];
    const agricultureDonationIds = donationIds['1563'];
    this.scene = scene;
    console.log(donationIds, 'donationIds being printed');
    this.biomes = [
      // new Biome(scene, camera, [0, 0, -6], donationIds),
      new ForestBiome(scene, camera, [0, 0, -6], forestDonationIds),
      new MarineBiome(scene, camera, [0, 0, -6], marineDonationIds),
      new AgricultureBiome(scene, camera, [0, 0, -6], agricultureDonationIds)
    ];
    this.currentIndex = 0;
    this.biomes[this.currentIndex].setScene();
    this.lastRotateTime = 0;
    this.environment = new EnvironmentBiome(scene, camera);
    this.environment.setScene();
    this.renderCurrentBiome();
  }

  removeBiome(i, dir = 1) {
    const biome = this.biomes[i];
    const coords = { y: this.biomes[i].group.position.y };
    biome.removeScene();
    new TWEEN.Tween(coords)
      .to({ y: dir * -10 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        biome.group.position.y = coords.y;
      })
      .start();
    setTimeout(() => this.scene.remove(biome.group), 1000);
  }

  renderCurrentBiome(dir) {
    const biome = this.biomes[this.currentIndex];
    biome.group.position.y = 10;
    biome.setScene();
    this.scene.add(biome.group);
    const coords = { y: dir * biome.group.position.y };
    new TWEEN.Tween(coords)
      .to({ y: 0 }, 1000)
      .easing(TWEEN.Easing.Quadratic.Out)
      .onUpdate(() => {
        biome.group.position.y = coords.y;
      })
      .start();
  }

  addObject(id, index = this.currentIndex) {
    const object = this.biomes[index].addObject(id);
    return object;
  }

  // addObject(index = this.currentIndex) {
  //   this.biomes[index].addObject();
  // }

  getCurrent() {
    return this.biomes[this.currentIndex];
  }

  animate() {
    this.biomes.forEach((biome) => biome.animate());
    this.environment.animate();
  }

  next() {
    if (Date.now() - this.lastRotateTime > 1000) {
      this.removeBiome(this.currentIndex, 1);
      this.currentIndex = (this.currentIndex + 1) % this.biomes.length;
      this.renderCurrentBiome(1);
      this.lastRotateTime = Date.now();
      return true;
    } else {
      return false;
    }
  }

  prev() {
    if (Date.now() - this.lastRotateTime > 1000) {
      this.removeBiome(this.currentIndex, -1);
      const n = this.biomes.length;
      this.currentIndex = (((this.currentIndex - 1) % n) + n) % n;
      this.renderCurrentBiome(-1);
      this.lastRotateTime = Date.now();
      return true;
    } else {
      return false;
    }
  }
}
