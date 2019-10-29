import * as THREE from 'three';
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

// a starter biome class 
class StarterBiome extends Biome { 
    constructor( scene, camera ) { 
        super( scene, camera );
        this.setScene(); 
        this.setObjects();
    }
    setScene() { 
        this._camera.position.z = 5;
    }
    setObjects() { 
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshPhongMaterial( { color: 0xaaaaff } );
        this.cube = new THREE.Mesh( geometry, material );
        this._scene.add( this.cube );       
    }
    animate() { 
        this.cube.rotation.y += .02;
        this.cube.rotation.x += .02;
    }
}

export default (scene, camera) => {
  const starterBiome = new StarterBiome(scene, camera);
  return {
    starterBiome
  };
};

