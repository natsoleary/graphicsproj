import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import { Group, Vector3, AnimationMixer, AnimationClip, Scene, Matrix4, Quaternion, Box3 } from 'three';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
//import MODEL from './NOVELO_TURTLE.obj';
import MODEL from './model_50a_-_hatchling_hawksbill_sea_turtle/scene.gltf'
import MAT from './NOVELO_TURTLE.mtl';
class Turtle extends Group {
    constructor(parent, camera) {
        super();
        //const loader = new OBJLoader();
        this.name = 'turtle';
        this.boundingBox = new Box3();
        this.boundingBox.min = new Vector3(-5, -5, -5);
        this.boundingBox.max = new Vector3(5, 5, 5);
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
            velocity: 5,
            keysPressed: [],
            repeated: true,
        };

        // var mtlLoader = new MTLLoader();
      
        //     mtlLoader.load(MAT, ( materials ) => {
        //     materials.preload();
        //     loader.setMaterials( materials );

            
        //     loader.load(MODEL, (object) => { // load object and add to scene
        //       //  object.traverse((child) => {s
        //       //   if (child.type == "Mesh") child.material.map = material;
        //       //    });

        //     object.scale.multiplyScalar(0.01);
        //     this.state.model = object.children[0];
        //     this.add(object);
        //   });
        // });

    let prevTurtPosition;

    if (this.state.model !== null) {
      prevTurtPosition = this.state.model;
      this.remove(this.state.model);
      this.state.model.geometry.dispose();
      this.state.model.material.dispose();
      this.state.mixer = null;
      this.state.prevTimeStamp = null;
      this.state.model = null;
      this.state.speed = 1000;
      this.state.upTime = 0;
      this.state.downTime = 0;
      this.state.rightTime = 0;
      this.state.leftTime = 0;
      this.state.animation =  null;
      this.state.action = null;
      this.state.newAnimate = false;
    }

    const loader = new GLTFLoader();

    // load the turtle
    loader.load(MODEL, (gltf) => {
      const model = gltf.scene.children[0];
      model.scale.set(50, 50, 50);

      // If there was a previous turtle, set it to that position and not the
      // origin
      if (prevTurtPosition == null) {
        model.position.copy(new Vector3(0, 0, 0));
      }
      else {
        model.position.copy(prevTurtPosition.position);
        model.rotation.copy(prevTurtPosition.rotation);
      }

      //copy rotations into state
      model.rotation.reorder('YXZ');



      this.state.xRotate = 0;
      this.state.yRotate = 0;
      this.state.zRotate = 0;
      model.children[0].rotateX(Math.PI/2);
      model.children[0].rotateY(Math.PI);
      model.matrixAutoUpdate = true;
      model.children[0].matrixAutoUpdate = true;;
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



//"Model 50A - Hatchling Hawksbill sea turtle" (https://skfb.ly/6QTKp) by DigitalLife3D is licensed under Creative Commons Attribution-NonCommercial (http://creativecommons.org/licenses/by-nc/4.0/).

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
          
          
                  this.state.speed = 1500;

          
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


              //  animate the turtle
              if (this.state.mixer !== null) {
                // set previous time stamp if null
                if (this.state.prevTimeStamp === null) {
                  this.state.prevTimeStamp = timeStamp;
                }
          
                // calculate delta
                const delta = (timeStamp - this.state.prevTimeStamp) / this.state.speed;

                // update previous time stamp
                this.state.prevTimeStamp = timeStamp;
          
                // update animation
                this.state.mixer.update(delta);
              }
          }
          


    }
export default Turtle;
