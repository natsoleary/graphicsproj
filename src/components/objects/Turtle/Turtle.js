import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Group } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './NOVELO_TURTLE.obj';
import MAT from './NOVELO_TURTLE.mtl';
class Turtle extends Group {
    constructor(parent, camera) {
        super();
        const loader = new OBJLoader();
        this.name = 'turtle';
        this.state = {
            xRotate: 0,
            yRotate: 0,
            zRotate: 0,
            camera: camera,
            parent: parent,
            model: null,
        };
        var mtlLoader = new MTLLoader();
  
        mtlLoader.load(MAT, ( materials ) => {
        materials.preload();
        loader.setMaterials( materials );

        
        loader.load(MODEL, (object) => { // load object and add to scene
          //  object.traverse((child) => {
          //   if (child.type == "Mesh") child.material.map = material;
          //    });
          console.log(this)
        object.scale.multiplyScalar(0.01);
        this.state.model = object.children[0];
        this.add(object);
      });
    });
        // Add update list
      parent.addToUpdateList(this);
    }
    update(timeStamp) {
            // this.state.parent.state.y -= 0.5;
            // // move turtle foward
            // this.state.parent.state.z += this.state.velocity * Math.cos(this.state.yRotate);
            // this.state.parent.state.x += this.state.velocity * Math.sin(this.state.yRotate);
            // this.state.camera.position.x = 300 * Math.sin(-this.state.yRotate);
            // this.state.camera.position.y = 350 * Math.sin(this.state.xRotate + Math.PI/15);
            // this.state.camera.position.z = -300 * Math.cos(this.state.yRotate);
            // if (this.state.model != null) {
            // this.state.camera.lookAt(this.state.model.position);
            // }
            // this.state.prevTimeStamp = timeStamp;


    }
}
export default Turtle;
