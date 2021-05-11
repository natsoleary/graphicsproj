import { Group, Vector3 } from 'three';
import MODEL from './shark.obj';
import MATERIAL from './shark.mtl';
import IMAGE from './SharkTxt.png';
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
    //   object.scale.multiplyScalar(0.5);
    //   object.position.y = -23.7;
      this.add(object);
    });
  }
}

  export default Shark;