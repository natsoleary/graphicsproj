import * as Dat from 'dat.gui';
import { Scene, Color } from 'three';
import { Flower, Land, Shark, Turtle, Seafloor} from 'objects';
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

        // Add meshes to scene
        // const land = new Land();
        // const flower = new Flower(this);
        // const shark = new Shark();
        const lights = new BasicLights();
        const turtle = new Turtle(this, camera);
        var seafloor = new Seafloor(this);
        this.add(turtle, seafloor, lights);

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
