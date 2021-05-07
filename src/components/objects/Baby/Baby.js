import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Group, Box3, Vector3 } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './NOVELO_TURTLE.obj';
import MAT from './NOVELO_TURTLE.mtl';
class Baby extends Group {
    constructor(parent) {
        super();
        this.state = {
          parent: parent,
          model: null,
        }
        this.name = "Baby";

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
        let x = Math.random() * 2000 - 1000;
        let y = 100 + Math.random() * 100;
        let z = Math.random() * 2000 - 1000;
        // this.baby.position.set(Math.random() * 2000 - 1000, 100 + Math.random() * 100, Math.random() * 2000 - 1000);
        this.baby.position.set(x, y, z);
        this.real_pos = new Vector3(x, y, z);
        // console.log(this.baby.position);
        this.add(this.baby);
        this.state.model = object;
        // console.log(this.baby.position);

        
        // console.log(this.babyModel);
        // this.add(object);
      });
    });
    this.real_position = this.real_pos;
    this.state.parent.babyModel = this.state.model;

    this.boundingBox = new Box3();
    }
    update() {
        this.boundingBox.setFromObject(this);

    }

}
export default Baby;