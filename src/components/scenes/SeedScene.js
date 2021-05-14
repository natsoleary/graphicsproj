import * as Dat from 'dat.gui';
import { Scene, Color, FogExp2, Fog, Vector3, Raycaster, Box3, MeshBasicMaterial, Mesh, BoxGeometry, LoadingManager} from 'three';
import {Shark, Turtle, TerrainPlane, TerrainManager, Baby, Boot} from 'objects';
import { BasicLights } from 'lights';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import SHARK_MODEL from './Mesh_Shark.obj';
import SHARK_IMAGE from './Tex_Shark.png';
import BOOT_MODEL from './CHAHIN_BOOTS.obj';
import BOOT_IMAGE from './CHAHIN_BOOTS_TEXTURE.jpg';
import KELP_MODEL from './PUSHILIN_kelp.obj';
import KELP_IMAGE from './PUSHILIN_kelp.png';
import BABY_MODEL from './NOVELO_TURTLE.obj';
import BABY_MAT from './NOVELO_TURTLE.mtl';
import TRASH_MODEL from './trash_model.obj';
import TRASH_MAT from './trash_materials.mtl';
import CAN_MODEL from './SodaCan_01.obj';
import CAN_MAT from './SodaCan_01.mtl';
import BOTTLE_MODEL from './water_bottle.obj';
import BOTTLE_MAT from './water_bottle.mtl';
import ANEMONE_MODEL from './anemone.obj';
import ANEMONE_MAT from './anemone.mtl';
import PIPE_MODEL from './PipeOrganCactus.obj';
import PIPE_MAT from './PipeOrganCactus.mtl';
import PIPE_IMAGE from './PipeOrganCactus_BaseColor.png'
import PURPLE_MODEL from './2_Anemone.obj';
import PURPLE_IMAGE from './2_Anemone.png'





import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { TextureLoader } from 'three/src/loaders/TextureLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';


// import { Turtle } from '../objects';

class SeedScene extends Scene {
    constructor(camera) {
        // Call parent Scene() constructor
        super();
        // Init state
        this.lives = 3;
        this.babies = 0;
        this.state = {
            updateList: [],
            x: 0,
            y: 0,
            z: 0,
        };
        this.babyadded = false;
        this.collidableMeshList = [];
        this.obstacleList = [];
        // Set background to a nice color
        this.background = new Color(0x7ec0ee);
        const color = 0x84e0ff;
        const near = 10;
        const far = 1200;
        this.fog = new Fog(color, near, far);
        this.box = new BoxGeometry(7, 7, 7);
        var boxmaterial = new MeshBasicMaterial( { color: 0x9999ff} );
        var boundbox = new Mesh( this.box, boxmaterial );
        boundbox.visible = false;
        this.boundbox = boundbox;

        this.add(boundbox);
        console.log(boundbox);
        // this.fog = new FogExp2(color, density);


        // Add meshes to scene
        // const land = new Land();
        // const flower = new Flower(this);
        // const shark = new Shark();
        const lights = new BasicLights();
        const turtle = new Turtle(this, camera);
        // var seafloor = new Seafloor(this);
        // var terrain = new TerrainPlane(this);
        this.turtle_object = turtle;
        // turtle.boundingBox = turtle.boundingBox.setFromObject(turtle);
        this.turtleboundingbox = turtle.boundingBox;

        this.onlydoonce = false;

        this.add(turtle, lights);
        this.sharkLoaded = false;
        this.bootLoaded = false;
        this.kelpLoaded = false;
        this.babyLoaded = false;
        this.trashLoaded = false;
        this.canLoaded = false;
        this.bottleLoaded = false;
        this.anemoneLoaded = false;
        this.pipeLoaded = false;
        this.fishLoaded = false;
        this.purpleLoaded = false;

        this.kelp = null;
        this.shark = null;
        this.boot = null;
        this.baby = null;
        this.trash = null;
        this.can = null;
        this.bottle = null;
        this.anemone = null;
        this.pipe = null;
        this.fish = null;
        this.purple = null;

        this.loadSharks();
        this.loadBoots();
        this.loadKelp();
        this.loadBaby();
        this.loadTrash();
        this.loadCan();
        this.loadBottle();
        this.loadAnemone();
        this.loadPipe();
        this.loadPurple();
        //this.loadFish();

        this.ONCE = true;


    }

    

    loadSharks() {
        const sharkmanager = new LoadingManager();
        sharkmanager.onLoad = () => {
            this.sharkLoaded = true;
        }
        const sharkloader = new OBJLoader(sharkmanager);

        sharkloader.load(SHARK_MODEL, (object) => { // load object and add to scene
            let texture = new TextureLoader().load(SHARK_IMAGE);
            object.traverse((child) => {
              if (child.type == "Mesh") child.material.map = texture;
            });
            this.shark = object;
            object.scale.multiplyScalar(0.5);
          });
    }
    loadBoots() {
        const bootmanager = new LoadingManager();
        bootmanager.onLoad = () => {
        this.bootLoaded = true;
        }
        const bootloader = new OBJLoader(bootmanager);

        bootloader.load(BOOT_MODEL, (object) => { // load object and add to scene
            let texture = new TextureLoader().load(BOOT_IMAGE);
            object.traverse((child) => {
              if (child.type == "Mesh") child.material.map = texture;
            });
            this.boot = object;
            this.boot.name = "boot";
            object.scale.multiplyScalar(5);
          });
    }
    loadKelp() {
        const kelpmanager = new LoadingManager();
        kelpmanager.onLoad = () => {
        this.kelpLoaded = true;
        }
        const kelploader = new OBJLoader(kelpmanager);

        kelploader.load(KELP_MODEL, (object) => { // load object and add to scene
            let texture = new TextureLoader().load(KELP_IMAGE);
            object.traverse((child) => {
              if (child.type == "Mesh") child.material.map = texture;
            });
            this.kelp = object;
            object.scale.multiplyScalar(10);
          });
    }
    loadBaby () {
        const babymanager = new LoadingManager();
        babymanager.onLoad = () => {
            this.babyLoaded = true;
            }
        const babyloader = new OBJLoader(babymanager);

        var mtlLoader = new MTLLoader();
      
        mtlLoader.load(BABY_MAT, ( materials ) => {
          materials.preload();
          babyloader.setMaterials( materials );
          babyloader.load(BABY_MODEL, (object) => { // load object and add to scen

            object.scale.multiplyScalar(0.01);
            this.baby = object;
          });
        });
    }
    loadTrash () {
        const trashmanager = new LoadingManager();
        trashmanager.onLoad = () => {
            this.trashLoaded = true;
            }
        const trashloader = new OBJLoader(trashmanager);

        var mtlLoader = new MTLLoader();
      
        mtlLoader.load(TRASH_MAT, ( materials ) => {
          materials.preload();
          trashloader.setMaterials( materials );
          trashloader.load(TRASH_MODEL, (object) => { // load object and add to scen

            object.scale.multiplyScalar(50);
            object.rotateZ(Math.PI/4);
            this.trash = object;
          });
        });
    }
    loadCan () {
        const canmanager = new LoadingManager();
        canmanager.onLoad = () => {
            this.canLoaded = true;
            }
        const canloader = new OBJLoader(canmanager);

        var mtlLoader = new MTLLoader();
      
        mtlLoader.load(CAN_MAT, ( materials ) => {
          materials.preload();
          canloader.setMaterials( materials );
          canloader.load(CAN_MODEL, (object) => { // load object and add to scen

            object.scale.multiplyScalar(.04);
            // object.rotateZ(Math.PI/4);
            this.can = object;
          });
        });
    }
    loadBottle () {
        const bottlemanager = new LoadingManager();
        bottlemanager.onLoad = () => {
            this.bottleLoaded = true;
            }
        const bottleloader = new OBJLoader(bottlemanager);

        var mtlLoader = new MTLLoader();
      
        mtlLoader.load(BOTTLE_MAT, ( materials ) => {
          materials.preload();
          bottleloader.setMaterials( materials );
          bottleloader.load(BOTTLE_MODEL, (object) => { // load object and add to scen

            object.scale.multiplyScalar(3);
            object.rotateZ(-Math.PI/4);
            this.bottle = object;
          });
        });
    }
    loadAnemone () {
        const anemonemanager = new LoadingManager();
        anemonemanager.onLoad = () => {
            this.anemoneLoaded = true;
            }
        const anemoneloader = new OBJLoader(anemonemanager);

        var mtlLoader = new MTLLoader();
      
        mtlLoader.load(ANEMONE_MAT, ( materials ) => {
          materials.preload();
          anemoneloader.setMaterials( materials );
          anemoneloader.load(ANEMONE_MODEL, (object) => { // load object and add to scen

            object.scale.multiplyScalar(7);
            // object.rotateZ(-Math.PI/4);
            this.anemone = object;
          });
        });
    }
    loadPipe () {
        const pipemanager = new LoadingManager();
        pipemanager.onLoad = () => {
            this.pipeLoaded = true;
        }
        const pipeloader = new OBJLoader(pipemanager);

        pipeloader.load(PIPE_MODEL, (object) => { // load object and add to scene
            let texture = new TextureLoader().load(PIPE_IMAGE);
            object.traverse((child) => {
              if (child.type == "Mesh") child.material.map = texture;
            });
            this.pipe = object;
            object.scale.multiplyScalar(8);
          });
    }
    loadPurple () {
        const purplemanager = new LoadingManager();
        purplemanager.onLoad = () => {
            this.purpleLoaded = true;
        }
        const purpleloader = new OBJLoader(purplemanager);

        purpleloader.load(PURPLE_MODEL, (object) => { // load object and add to scene
            let texture = new TextureLoader().load(PURPLE_IMAGE);
            object.traverse((child) => {
              if (child.type == "Mesh") child.material.map = texture;
            });
            this.purple = object;
            // object.scale.multiplyScalar();
          });
    }
    loadFish() {
        const fishmanager = new LoadingManager();
        fishmanager.onLoad = () => {
            this.fishLoaded = true;
        }
        const fishloader = new GLTFLoader(fishmanager);
        fishloader.load(FISH_MODEL, (gltf) => {
        const model = gltf.scene.children[0];
        model.scale.set(0.1, 0.1, 0.1);

        this.fish = model;
  
     
        model.rotateZ(Math.PI/2);
          //model.children[0].rotateY(Math.PI);
    
          // add model to scene
        });
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        if (this.sharkLoaded && this.bootLoaded && this.kelpLoaded && this.babyLoaded && this.trashLoaded && this.canLoaded && 
             this.bottleLoaded && this.anemoneLoaded && this.pipeLoaded && this.purpleLoaded && this.ONCE) {
            this.ONCE = false;
            console.log("here");
            var terrainMan = new TerrainManager(this, this.shark, this.boot, this.kelp, this.baby, this.trash, this.can, 
                this.bottle, this.anemone, this.pipe, this.purple);
            this.add(terrainMan)
        }
        const { updateList, x, y, z } = this.state;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp, this.state.x, this.state.y, this.state.z);

            // update twice to prevent glitching due to moving terrain
            if (obj.name == "TerrainManager") {
                obj.update(timeStamp, this.state.x, this.state.y, this.state.z);
            }

            
        }
        this.detectCollisions();
        this.detectObstacles();

    }
    detectObstacles() {
        var originPoint = this.boundbox.position.clone();
        for (var vertexIndex = 0; vertexIndex < this.box.vertices.length; vertexIndex++) {		
            var localVertex = this.box.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( this.boundbox.matrix );
            var directionVector = globalVertex.sub( this.boundbox.position );
            var ray = new Raycaster( originPoint, directionVector.clone().normalize() );
            if (this.obstacleList.length > 0) {
                // console.log(this.collidableMeshList);
                var collisionResults = ray.intersectObjects( this.obstacleList );
                let index = 0;
                for (let object of this.obstacleList) {
                    var collisionResults = ray.intersectObject(object.BB);
                    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                        console.log("ouch");
                        object.delete();
                        this.obstacleList.splice(index, 1);
                        this.lives -= 1;
                        // console.log(this.lives);
                        return;
                    }
                    index++;
                }
            }
        }
    }

    detectCollisions() {
        var originPoint = this.boundbox.position.clone();
        for (var vertexIndex = 0; vertexIndex < this.box.vertices.length; vertexIndex++) {		
            var localVertex = this.box.vertices[vertexIndex].clone();
            var globalVertex = localVertex.applyMatrix4( this.boundbox.matrix );
            var directionVector = globalVertex.sub( this.boundbox.position );
            var ray = new Raycaster( originPoint, directionVector.clone().normalize() );
            if (this.collidableMeshList.length > 0) {
                // console.log(this.collidableMeshList);
                var collisionResults = ray.intersectObjects( this.collidableMeshList );
                let index = 0;
                for (let object of this.collidableMeshList) {
                    var collisionResults = ray.intersectObject(object.BB);
                    if (collisionResults.length > 0 && collisionResults[0].distance < directionVector.length()) {
                        console.log("hit");
                        object.delete();
                        this.collidableMeshList.splice(index, 1);
                        this.babies += 1;
                        return;
                    }
                    index++;
                }
            }
        }
    }
    getBabies() {
        return this.babies;
    }
    getLives() {
        return this.lives;
    }

   
    pauseTurtle() {
        this.turtle_object.state.velocity = 0;
    }
    unpauseTurtle(easy, medium, hard) {
        if (easy) this.turtle_object.state.velocity = 3;
        else if (medium) this.turtle_object.state.velocity = 5;
        else if (hard) this.turtle_object.state.velocity = 7;
        else {
            this.turtle_object.state.velocity = 5;
        }
    }
    }

export default SeedScene;
