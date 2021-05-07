import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Group, Box3, Vector3 } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './NOVELO_TURTLE.obj';
import MAT from './NOVELO_TURTLE.mtl';
class Baby extends Group {
    constructor(parent) {
      super();
      this.name = "Baby";
      let x = Math.random() * 2000 - 1000;
      let y = 100 + Math.random() * 100;
      let z = Math.random() * 2000 - 1000;
      this.real_position = new Vector3(x, y, z);
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

      this.boundingBox = new Box3();
    }
    getPosition() {
      return this.real_pos;
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