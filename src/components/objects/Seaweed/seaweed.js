import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Group, Box3, Vector3, AnimationMixer } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './sea_weed/scene.gltf';

class Seaweed extends Group {
    constructor(parent, x, y, z) {
      super();
      this.name = "Seaweed";
      this.state = {
        model: null,
        mixer: null,
        animation: null,
        action: null,
        newAnimate: false,
        speed: 1000,
    };

    //   let x = Math.random() * 2000 - 1000;
    //   let y = Math.random();
    //   let z = Math.random() * 2000 - 1000;
      this.real_position = new Vector3(x, y, z);

      const loader = new GLTFLoader();

      // load the seaweed
      loader.load(MODEL, (gltf) => {
        const model = gltf.scene.children[0];
        model.scale.set(50, 50, 50);

        this.baby = model;
        this.baby.position.set(x, y, z);

        //copy rotations into state
       // model.rotation.reorder('YXZ');
        // this.state.xRotate = 0;
        // this.state.yRotate = 0;
        // this.state.zRotate = 0;
        // model.children[0].rotateX(Math.PI/2);
        // model.children[0].rotateY(Math.PI);
        // console.log("turtle", model.children[0].getWorldPosition());
  
        this.state.animation = gltf.animations[0];
        // add mixer to state
        const mixer = new AnimationMixer(model);
        this.state.mixer = mixer;
        this.state.action = mixer.clipAction(gltf.animations[0]);
        this.state.action.play();
  
        // set model to state
        this.state.model = model;
  
        // add model to scene
        this.add(model);
      });

      this.boundingBox = new Box3();

    }

    getPosition() {
      return this.real_pos;
    }

    update(xneg, zneg, offset) {

            //  animate the seaweed
            if (this.state.mixer !== null) {

                const delta = 0.01;
                // update animation
                this.state.mixer.update(delta);
            }


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
export default Seaweed;