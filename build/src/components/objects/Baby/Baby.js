import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Group, Box3, Vector3, BoxGeometry, MeshBasicMaterial, Mesh } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './NOVELO_TURTLE.obj';
import MAT from './NOVELO_TURTLE.mtl';

// const xsize = 0.0676427978515;
// const ysize = 0.020390990448;
// const zsize = 164.0717635986329;
const xsize = 100;
const ysize = 100;
const zsize = 100;

class Baby extends Group {
    constructor(parent) {
        super();
        this.name = "Baby";
        this.parent = parent;
        let x = Math.random() * 1000;
        let y = 70 + Math.random() * 50;
        let z = Math.random() * 1000;
        this.position.set(x,y,z)
        this.box = new BoxGeometry(10, 10, 10);
        this.boxmaterial = new MeshBasicMaterial( { color: 0x9999ff} );
        var boundbox = new Mesh( this.box, this.boxmaterial );
        boundbox.position.set(x,y,z);
        boundbox.visible = false;
        this.BB = boundbox;
        this.add(this.BB);
        const loader = new OBJLoader();

        var mtlLoader = new MTLLoader();
      
        mtlLoader.load(MAT, ( materials ) => {
          materials.preload();
          loader.setMaterials( materials );
          loader.load(MODEL, (object) => { // load object and add to scen

            object.scale.multiplyScalar(0.01);
            this.baby = object;
            this.baby.position.set(x, y, z);
            this.add(this.baby);
          });
        });


    }
    disposeOf() {
      this.boxmaterial.dispose();
      this.box.dispose();
      this.remove(this.BB);
      this.remove(this.baby);

      
    }
    delete() {
      this.boxmaterial.dispose();
      this.box.dispose();
      this.remove(this.BB);
      this.parent.remove(this);

      this.remove(this.baby);
    }

}
export default Baby;