import { Group, Vector3 } from 'three';
import MODEL from './Mesh_Shark.obj';
import MATERIAL from './shark.mtl';
import IMAGE from './Tex_Shark.png';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

// from https://poly.google.com/view/1mVWW4RFVHc
// Credit: Poly by Google
class Shark extends Group {
  constructor() {
    super();
    const loader = new OBJLoader();
    this.name = 'shark';
    loader.load(MODEL, (object) => { // load object and add to scene
      let texture = new TextureLoader().load(IMAGE);
      object.traverse((child) => {
        if (child.type == "Mesh") child.material.map = texture;
      });
      object.scale.multiplyScalar(0.1);
      //object.position.y = -23.7;
      this.add(object);
    });
  }
}

  export default Shark;