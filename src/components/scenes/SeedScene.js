import * as Dat from 'dat.gui';
import { Scene, Color, FogExp2, Fog  } from 'three';
import { Flower, Land, Shark, Turtle, Seafloor, TerrainPlane} from 'objects';
import { BasicLights } from 'lights';
// import { Turtle } from '../objects';

class SeedScene extends Scene {
    constructor(camera) {
        // Call parent Scene() constructor
        super();

        // Init state
        this.state = {
            gui: new Dat.GUI(), // Create GUI for scene
            updateList: [],
            x: 0,
            y: 0,
            z: 0,
        };

        // Set background to a nice color
        this.background = new Color(0x7ec0ee);
        const color = 0x800080;
        const density = 0.01;
        const near = 10;
        const far = 500;
        this.fog = new Fog(color, near, far);
        // this.fog = new FogExp2(color, density);

        // Add meshes to scene
        // const land = new Land();
        // const flower = new Flower(this);
        // const shark = new Shark();
        const lights = new BasicLights();
        const turtle = new Turtle(this, camera);
        // var seafloor = new Seafloor(this);
        var terrain = new TerrainPlane(this);
        this.add(turtle, lights, terrain);

        // Populate GUI
    }

    addToUpdateList(object) {
        this.state.updateList.push(object);
    }

    update(timeStamp) {
        const { updateList, x, y, z } = this.state;

        // Call update for each object in the updateList
        for (const obj of updateList) {
            obj.update(timeStamp);
        }
    }
}

export default SeedScene;
