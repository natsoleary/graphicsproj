import { Group, Box3, Vector3, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import MODEL from './PUSHILIN_kelp.obj';
// import MATERIAL from './PUSHLIN_kelp.mtl';
import IMAGE from './PUSHILIN_kelp.png';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

// from https://poly.google.com/view/4cFllH6Iazk
// Credit: Poly by Google
class Kelp extends Group {
  constructor(parent, object) {
    super();
    // const loader = new OBJLoader();
    this.name = 'kelp';
    this.parent = parent;
    // this.position.set(position.x,position.y,position.z);
    this.box = new BoxGeometry(10, 10, 10);
    this.boxmaterial = new MeshBasicMaterial( { color: 0x9999ff} );
    var boundbox = new Mesh( this.box, this.boxmaterial );
    // boundbox.position.set(position.x,position.y,position.z);
    boundbox.visible = false;
    this.BB = boundbox;
    this.add(this.BB);
    this.object = object;
    this.add(this.object);
    // loader.load(MODEL, (object) => { // load object and add to scene
    //   let texture = new TextureLoader().load(IMAGE);
    //   object.traverse((child) => {
    //     if (child.type == "Mesh") child.material.map = texture;
    //   });
    //   this.object = object;
    // //   this.object.position.set(position.x, position.y, position.z);
    //   object.scale.multiplyScalar(20);
    //   this.add(this.object);
    // });
  }
  disposeOf() {
    this.boxmaterial.dispose();
    this.box.dispose();
    this.remove(this.BB);
    this.remove(this.object);

    
  }
  delete() {
    this.boxmaterial.dispose();
    this.box.dispose();
    this.remove(this.BB);
    this.parent.remove(this);

    this.remove(this.object);
  }
}

  export default Kelp;