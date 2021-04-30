import { Group } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { TWEEN } from 'three/examples/jsm/libs/tween.module.min.js';
import MODEL from './turtle/NOVELO_TURTLE.gltf';
class Turtle extends Group {
    constructor(parent) {
        super();
        const loader = new GLTFLoader();
        this.name = 'NOVELO_TURTLE';

        loader.load(MODEL, (gltf) => {
            this.add(gltf.scene);
            console.log(gltf.animations);

        });
    }
}
export default Turtle;
