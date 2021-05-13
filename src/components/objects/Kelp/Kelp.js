import { Group, Box3, Vector3, BoxGeometry, MeshBasicMaterial, Mesh, Object3D } from 'three';
import MODEL from './PUSHILIN_kelp.obj';
import IMAGE from './PUSHILIN_kelp.png';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

// from https://poly.google.com/view/4cFllH6Iazk
// Credit: Poly by Google
class Kelp extends Group {
  constructor(parent) {
    super();
    // const loader = new OBJLoader();
    this.name = 'kelp';
    this.parent = parent;
    this.object = new Object3D();
    this.object.copy(parent.objects.kelp);
    // this.object.position.set(x,y,z);
    this.add(this.object);


    // loader.load(MODEL, (object) => { // load object and add to scene
    //   let texture = new TextureLoader().load(IMAGE);
    //   object.traverse((child) => {
    //     if (child.type == "Mesh") child.material.map = texture;
    //   });
    //   this.object = object;
    //   object.scale.multiplyScalar(20);
    //   this.add(this.object);
    // });
  }
  disposeOf() {

    this.remove(this.object);

    
  }
  delete() {

    this.parent.remove(this);

    this.remove(this.object);
  }
}

  export default Kelp;