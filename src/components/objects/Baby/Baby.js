import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Group } from 'three';
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

        
        loader.load(MODEL, (object) => { // load object and add to scene
          //  object.traverse((child) => {s
          //   if (child.type == "Mesh") child.material.map = material;
          //    });

        object.scale.multiplyScalar(0.01);
        this.baby = object;
        this.baby.position.set(Math.random() * 2000 - 1000, 50 + Math.random() * 100, Math.random() * 2000 - 1000);
        this.add(this.baby);

        
        // console.log(this.babyModel);
        // this.add(object);
      });
    });
    }

}
export default Baby;