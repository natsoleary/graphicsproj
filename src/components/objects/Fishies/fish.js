import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Group, Box3, Vector3, AnimationMixer } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './cartoon_anglerfish/scene.gltf';

class Fish extends Group {
    constructor(parent) {
      super();
      this.name = "Fish";


       let x = Math.random() * 2000 - 1000;
       let y = Math.random()*200 + 100;
       let z = Math.random() * 2000 - 1000;
      this.real_position = new Vector3(x, y, z);

      const loader = new GLTFLoader();

      // load the seaweed
      loader.load(MODEL, (gltf) => {
        const model = gltf.scene.children[0];
        model.scale.set(0.1, 0.1, 0.1);

        this.baby = model;
        this.baby.position.set(x, y, z);

   
        model.rotateZ(Math.PI/2);
        //model.children[0].rotateY(Math.PI);
  
        // add model to scene
        this.add(model);
      });

      this.boundingBox = new Box3();

    }

    getPosition() {
      return this.real_pos;
    }


}
export default Fish;