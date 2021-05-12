import { Group, Box3, Vector3, Vector2, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import MODEL from './shark.obj';
import MATERIAL from './shark.mtl';
import IMAGE from './SharkTxt.png';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

// from https://poly.google.com/view/1mVWW4RFVHc
// Credit: Poly by Google
class Shark extends Group {
  constructor(parent) {
    super();
    this.parent = parent;
    let x = Math.random() * 1500;
    let y = 70 + Math.random() * 50;
    let z = Math.random() * 1500;
    this.position.set(x,y,z)
    this.box = new BoxGeometry(10, 10, 10);
    this.boxmaterial = new MeshBasicMaterial( { color: 0x9999ff} );
    var boundbox = new Mesh( this.box, this.boxmaterial );
    boundbox.position.set(x,y,z);
    boundbox.visible = false;
    this.BB = boundbox;
    this.add(this.BB);
    const loader = new OBJLoader();
    this.name = 'shark';
    loader.load(MODEL, (object) => { // load object and add to scene
      let texture = new TextureLoader().load(IMAGE);
      object.traverse((child) => {
        if (child.type == "Mesh") child.material.map = texture;
      });
      this.shark = object;
      this.shark.position.set(x,y,z);
      object.scale.multiplyScalar(3);
    //   object.position.y = -23.7;
      this.add(object);
    });
  }

update(timeStamp) {
   // move Shark
   if (this.shark != undefined) {
    let oldSharkLocation = new Vector2(this.shark.position.x, this.shark.position.z);
    let newSharkLocation = new Vector2(10*Math.cos(timeStamp/2000), 10*Math.sin(timeStamp/2000));
    let sharkDifference = oldSharkLocation.clone().sub(newSharkLocation);
    let sharkAng = sharkDifference.angle();
    this.shark.rotation.y = -1 * (sharkAng -  6 * Math.PI / 4);
    this.shark.position.x = 100*Math.cos(timeStamp/2000);
    this.shark.position.z = 100*Math.sin(timeStamp/2000);
   }
}
disposeOf() {
  this.boxmaterial.dispose();
  this.box.dispose();
  this.remove(this.BB);
  this.remove(this.shark)

  
}
delete() {
  this.boxmaterial.dispose();
  this.box.dispose();
  this.remove(this.BB);
  this.parent.remove(this);

  this.remove(this.shark);
}
}
  export default Shark;