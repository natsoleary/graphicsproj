import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Group, Box3, Vector3, AnimationMixer, Object3D } from 'three';
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
       this.object = new Object3D();
      this.object.copy(parent.objects.fish);
      this.object.writable = true;

      this.position = new Vector3(x, y, z);

      this.object.position = new Vector3(x,y,z);
      this.add(this.object);

   


    }

    disposeOf() {

      this.remove(this.object);
  
      
    }
    delete() {
  
      this.parent.remove(this);
  
      this.remove(this.object);
    }
  }
  
    export default Fish;