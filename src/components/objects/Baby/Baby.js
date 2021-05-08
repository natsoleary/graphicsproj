import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Group, Box3 } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './NOVELO_TURTLE.obj';
import MAT from './NOVELO_TURTLE.mtl';
class Baby extends Group {
    constructor(parent) {
        super();
        const loader = new OBJLoader();

        var mtlLoader = new MTLLoader();
      
        mtlLoader.load(MAT, ( materials ) => {
        materials.preload();
        loader.setMaterials( materials );
        loader.load(MODEL, (object) => { // load object and add to scen

          object.scale.multiplyScalar(0.01);
          this.baby = object;

        object.scale.multiplyScalar(0.01);
        this.baby = object;
        this.name = "Baby";
        this.baby.position.set(Math.random() * 2000 - 1000, 100 + Math.random() * 100, Math.random() * 2000 - 1000);
        // console.log(this.baby.position);
        this.add(this.baby);
        this.real_position = this.baby.position;

        
        // console.log(this.babyModel);
        // this.add(object);
      });
    });
    this.boundingBox = new Box3();
    }
    update(xneg, zneg, offset) {
        this.boundingBox.setFromObject(this);
        if (xneg) {
          this.real_position.x -= offset;
        }
        else {
          this.real_position.x += offset;
        }
        if (zneg) {
          this.real_position.z -= offset;
        }
        else {
          this.real_position.z += offset;
        }

    }

}
export default Baby;