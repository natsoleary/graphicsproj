import { Group, Box3, Vector3, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import MODEL from './CHAHIN_BOOTS.obj';
import MATERIAL from './CHAHIN_BOOTS.mtl';
import IMAGE from './CHAHIN_BOOTS_TEXTURE.jpg';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';

// from https://poly.google.com/view/7HbqG8RwRcA
// Credit: Poly by Google
class Boot extends Group {
  constructor(parent) {
    super();
    const loader = new OBJLoader();
    this.name = 'boot';
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
    loader.load(MODEL, (object) => { // load object and add to scene
      let texture = new TextureLoader().load(IMAGE);
      object.traverse((child) => {
        if (child.type == "Mesh") child.material.map = texture;
      });
      this.object = object;
      this.object.position.set(x, y, z);
      this.add(this.object);
    });
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

    this.remove(this.baby);
  }
}

  export default Boot;