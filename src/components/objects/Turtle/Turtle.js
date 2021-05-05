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
            mixer: null,
            prevTimeStamp: null,
            speed: 1000,
            upTime: 0,
            downTime: 0,
            rightTime: 0,
            leftTime: 0,
            forwardTime: 0,
            backwardTime: 0,
            animation: null,
            action: null,
            newAnimate: false,
            velocity: 2,
            keysPressed: [],
            repeated: true,
        };

        var mtlLoader = new MTLLoader();
      
            mtlLoader.load(MAT, ( materials ) => {
            materials.preload();
            loader.setMaterials( materials );

            
            loader.load(MODEL, (object) => { // load object and add to scene
              //  object.traverse((child) => {s
              //   if (child.type == "Mesh") child.material.map = material;
              //    });

            object.scale.multiplyScalar(0.01);
            this.state.model = object.children[0];
            console.log(this.state.model);
            this.add(object);
          });
        });

    // window listeners to rotate turtle
      // set keysPressed true when key is pressed
      window.addEventListener('keydown', (event) => {
        this.turtleHandler(event);
      }, false);


      // set keysPressed to false when key is lifted
      window.addEventListener('keyup', (event) => {
        this.state.keysPressed[event.keyCode] = false;
      }, false);


        // Add update list
      parent.addToUpdateList(this);
    }


 // rotate turtle based on arrow keys pressed
 turtleHandler(event) {
  // change the state of the turtle
  this.state.keysPressed[event.keyCode] = true;

  // turtle goes up 
  if (this.state.keysPressed[38]) {
    this.state.upTime = event.timeStamp;
  }

  // turtle goes down
  if (this.state.keysPressed[40]) {
    this.state.downTime = event.timeStamp;
    this.state.repeated = event.repeat;
  }

  // turtle goes right
  if (this.state.keysPressed[39]) {
    this.state.rightTime = event.timeStamp;
  }

  // turtle goes left 
  if (this.state.keysPressed[37]) {
    this.state.leftTime = event.timeStamp;
  }
}



update(timeStamp, x, y, z) {


     
              if (this.state.model != null) {
                // if the up arrow key is pressed
                if (this.state.keysPressed[38]) {
                  // change x rotation
                  if (this.state.xRotate >= -0.5) {
                    this.state.xRotate -= 0.005;
                  }
          
                  // change turtle speed to go faster
                  if (this.state.speed >= 700) {
                    this.state.speed -= 200;
                  }
          
                  // update terrain y position
                  this.state.parent.state.y -= 0.5;
                }


                // if the down arrow key is pressed
                if (this.state.keysPressed[40]) {
                  // change x rotation
                  if (this.state.xRotate <= 0.5) {
                      this.state.xRotate += 0.005;
                  }
          
                  // let animation = this.state.animation.clone();
                  // let track =  animation.tracks[0];
                  // let values = track.values;
          
                  // let vals = [];
                  // if (this.state.bird === 'Stork') {
                  //   vals = [0,13,26,39,58,72,86,103,104,117,136,150,168,169];
                  // }
                  // else if (this.state.bird === 'Parrot'){
                  //   vals = [0,12,24,37,50,67,80,93,106,119];
                  // }
                  // else if (this.state.bird === 'Flamingo') {
                  //   vals = [5,18,33,48,63,79,94,109,124,139,152,165,178,191,201];
                  // }
          
                  // for (let i = 0; i < values.length; i++) {
                  //   if (vals.includes(i)) {
                  //     values[i] = 1;
                  //   }
                  //   else {
                  //     values[i] = 0;
                  //   }
                  // }
          
                  this.state.speed = 1500;

                  // if (!this.state.repeated) {
                  //   const action = this.state.mixer.clipAction(animation);
                  //   this.state.action = this.state.action.crossFadeTo(action, 1, true);
                  //   this.state.action.play();
                  //   this.state.newAnimate = true;
                  // }
          
                  // Update terrain position
                  if (this.state.parent.state.y <= 100) {
                    this.state.parent.state.y += .5;
                  }
                }


                // if the left arrow key is pressed
                if (this.state.keysPressed[37]) {
                  // update z rotation
                  if (this.state.zRotate >= -0.5) {
                    this.state.zRotate -= 0.01;
                  }
          
                  // Keep rotations between 0 and 2 * PI;
                  this.state.yRotate += 0.005;
                  this.state.yRotate = this.state.yRotate % (2 * Math.PI);
                }


                // if the right arrow key is pressed
                if (this.state.keysPressed[39]) {
                  // update z rotation
                  if (this.state.zRotate <= 0.5) {
                    this.state.zRotate += 0.01;
                  }
          
                  // Keep rotations between 0 and 2 * PI;
                  this.state.yRotate -= 0.005;
                  this.state.yRotate = this.state.yRotate % (2 * Math.PI);
                }
          
                // update rotation of the turtle
                this.state.model.rotation.x = this.state.xRotate;
                this.state.model.rotation.y = this.state.yRotate;
                this.state.model.rotation.z = this.state.zRotate;
          
                // move turtle foward
                this.state.parent.state.z += this.state.velocity * Math.cos(this.state.yRotate);
                this.state.parent.state.x += this.state.velocity * Math.sin(this.state.yRotate);
          
                // reposition turtle if arrows were pressed and aren't currently being pressed
                if (this.state.upTime + 1000 < timeStamp) {
                  if (this.state.xRotate <= 0.005) {
                    this.state.xRotate += 0.005;
                  }
                  if (this.state.speed <= 1000) {
                    this.state.speed += 50;
                  }
                }
                if (this.state.downTime + 1000 < timeStamp) {
                  if (this.state.xRotate >= 0.005) {
                    this.state.xRotate -= 0.005;
                  }
                }
                // if (this.state.downTime + 1000 < timeStamp && this.state.newAnimate) {
                //   this.state.speed = 1000;
                //   this.state.mixer.stopAllAction();
                //   const action = this.state.mixer.clipAction(this.state.animation);
                //   this.state.action = this.state.action.crossFadeTo(action, 1, true);
                //   this.state.action.play();
                //   this.state.newAnimate = false;
                // }
                if (this.state.leftTime + 1000 < timeStamp) {
                  if (this.state.zRotate <= 0) {
                    this.state.zRotate += 0.005;
                  }
                }
                if (this.state.rightTime + 1000 < timeStamp) {
                  if (this.state.zRotate >= 0) {
                    this.state.zRotate -= 0.005;
                  }
                }
          
          
              }
          
              // update turtle's speed based on its velocity if it is greater than 2
              if (this.state.velocity >= 2 && this.state.downTime + 1000 < timeStamp && this.state.upTime + 1000 < timeStamp){
                if (this.state.velocity >= 4) {
                  this.state.speed = 1800 / 4;
                }
                else {this.state.speed = 1800 / this.state.velocity;}
              }
          
              this.state.camera.position.x = 300 * Math.sin(-this.state.yRotate);
              this.state.camera.position.y = 350 * Math.sin(this.state.xRotate + Math.PI/15);
              this.state.camera.position.z = -300 * Math.cos(this.state.yRotate);

              if (this.state.model != null) {
                this.state.camera.lookAt(this.state.model.position);
                }

              this.state.prevTimeStamp = timeStamp;

              // //  animate the turtle
              // if (this.state.mixer !== null) {
              //   // set previous time stamp if null
              //   if (this.state.prevTimeStamp === null) {
              //     this.state.prevTimeStamp = timeStamp;
              //   }
          
              //   // calculate delta
              //   const delta = (timeStamp - this.state.prevTimeStamp) / this.state.speed;
          
              //   // update previous time stamp
              //   this.state.prevTimeStamp = timeStamp;
          
              //   // update animation
              //   this.state.mixer.update(delta);
              // }
          }
          


    }
export default Turtle;
