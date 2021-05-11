import * as Dat from 'dat.gui';
import { Scene, Color, FogExp2, Fog, Vector3, Raycaster, Box3, MeshBasicMaterial, Mesh, BoxGeometry  } from 'three';
import { Flower, Land, Shark, Turtle, Seafloor, TerrainPlane, TerrainManager, Baby} from 'objects';
import { BasicLights } from 'lights';
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
    
        // const baby = new Baby(this);
        // baby.position.set(0, 0, -4);
        // baby.visible = false;
        const lights = new BasicLights();
        const turtle = new Turtle(this, camera);
        // var seafloor = new Seafloor(this);
        // var terrain = new TerrainPlane(this);
        this.turtle_object = turtle;
        // turtle.boundingBox = turtle.boundingBox.setFromObject(turtle);
        this.turtleboundingbox = turtle.boundingBox;

        var terrainMan = new TerrainManager(this);
        terrainMan.update(0, this.state.x, this.state.y, this.state.z);
        this.onlydoonce = false;

        this.add(turtle, lights, terrainMan);

    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
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
    }

export default SeedScene;
