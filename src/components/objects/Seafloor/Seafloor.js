import { Group, Color, PlaneBufferGeometry, VertexColors, PlaneGeometry, MeshToonMaterial, MeshLambertMaterial, MeshBasicMaterial, Mesh, Vector2} from 'three';
import {TextureLoader } from 'three/src/loaders/TextureLoader.js';
import SAND from './sandgrain.jpeg';
const terrainSize = {width: 1000, height: 1000, vertsWidth: 100, vertsHeight: 100};

class Seafloor extends Group {
    constructor(parent) {

        super();
        // create the plane
        this.geometry = new PlaneGeometry(terrainSize.width,terrainSize.height,
            terrainSize.vertsWidth-1,terrainSize.vertsHeight-1);
                    //required for flat shading
        this.geometry.computeFlatVertexNormals();
        this.bumps = [];
        const textureLoader = new TextureLoader();
        textureLoader.load(SAND, (texture)=> {
	        let material = new MeshLambertMaterial({
    	        map: texture,
                wireframe: false,
                vertexColors: VertexColors,
                //required for flat shading
                flatShading: true,
      	    });  
            this.material = material;
            const terrain = new Mesh(this.geometry, material);
            console.log(terrain);
            // 82.4% red, 70.6% green and 54.9% blue.
            terrain.material.color.b = 0.6;
            terrain.material.color.g = 0.6;
            terrain.material.color.r = 0.6;
            this.count = 0;

            // cube.material.color.setHex(  );

            // update location on the map
            let groundY = -180 //-249;
            terrain.position.y = groundY - 1;
            terrain.rotation.x = -Math.PI / 2;
            terrain.receiveShadow = true;


            // this.addBumps();
            // this.newBump();

            this.add(terrain);
            // Add self to parent's update list
            parent.addToUpdateList(this);
        });  

       
    }

    addBumps() {
        // console.log(this.geometry);
        let bumpmaterial = new MeshLambertMaterial({
            // map: texture,
            wireframe: false,
            vertexColors: VertexColors,
            //required for flat shading
            flatShading: true,
          });  
        for (let j = 490; j > -500; j -= 70) {
            let bump = new PlaneGeometry(terrainSize.width, 50, 5, 5);
            bump.computeFlatVertexNormals();
            const bumpy = new Mesh(bump, bumpmaterial);
            let groundY = -199 //-249;
            bumpy.position.y = groundY - 1;
            bumpy.rotation.x = -Math.PI / 2;
            bumpy.receiveShadow = true;
            bumpy.position.z = j;
            bumpy.material.color.b = .34;
            bumpy.material.color.g = .34;
            bumpy.material.color.r = .34;
            this.add(bumpy);
            
            for (let i = 0; i  < 5; i++) {
                const index = (3*(5)+i);
                const index1 = (2*(5)+i);
                const index2 = (4*(5)+i);

                const vert = bump.vertices[index];
                const vert1 = bump.vertices[index1];
                const vert2 = bump.vertices[index2];
                vert.z += 7;
                vert1.z += 3;
                vert2.z += 3;
            }
            this.bumps.push(bumpy);
        }
    }
    newBump() {
        let bumpmaterial = new MeshLambertMaterial({
            // map: texture,
            wireframe: false,
            vertexColors: VertexColors,
            //required for flat shading
            flatShading: true,
          });  
        let bump = new PlaneGeometry(terrainSize.width, 50, 5, 5);
        bump.computeFlatVertexNormals();
        const bumpy = new Mesh(bump, bumpmaterial);
        let groundY = -199 //-249;
        bumpy.position.y = groundY - 1;
        bumpy.rotation.x = -Math.PI / 2;
        bumpy.receiveShadow = true;
        bumpy.position.z = 490;
        bumpy.material.color.b = .34;
        bumpy.material.color.g = .34;
        bumpy.material.color.r = .34;
        this.add(bumpy);
        
        for (let i = 0; i  < 5; i++) {
            const index = (3*(5)+i);
            const index1 = (2*(5)+i);
            const index2 = (4*(5)+i);

            const vert = bump.vertices[index];
            const vert1 = bump.vertices[index1];
            const vert2 = bump.vertices[index2];
            vert.z += 7;
            vert1.z += 3;
            vert2.z += 3;
        }
        this.bumps.push(bumpy);
    }

        // for (let j = 1; j < terrainSize.vertsHeight - 1; j += 5) {
        //     for (let i = 0; i < terrainSize.vertsWidth; i++) {
        //         // let offset = Math.round(Math.random()*5);
        //         const index = (j*(terrainSize.vertsWidth)+i);
        //         const index1 = ((j + 1)*terrainSize.vertsWidth+i);
        //         const index2 = ((j - 1)*terrainSize.vertsWidth+i);

        //         // console.log(index);
        //         const vertex = this.geometry.vertices[index];
        //         const vertex1 = this.geometry.vertices[index1];
        //         const vertex2 = this.geometry.vertices[index2];
        //         vertex.z += 7;
        //         vertex1.z += 3;
        //         vertex2.z += 3;


            
        //     }
        // }
        // console.log(this.geometry);
        // for (let j = 1; j < terrainSize.vertsHeight; j += 2) {
        //     for (let i = 0; i < terrainSize.vertsWidth; i++) {
        //         const index = (j*(terrainSize.vertsWidth)+i);
        //         // console.log(index);
        //         const vertex = this.geometry.vertices[index];
        //         vertex.z -= 5;
        //     }
        // }
    
    update (timeStamp){
        this.count++;
        // var offset = 5*Math.sin(timeStamp/(5*1000));
        // offset *= 10;
        // // console.log(offset)
        // for(let i = 0; i < this.geometry.vertices.length; i++) {
        // //   console.log("z = " + this.geometry.vertices[i].z);
        //   if(this.geometry.vertices[i] > 0) {
        //     this.geometry.vertices[i].z = this.geometry.vertices[i].z + offset;
        //   }
        // } 
        // for (let j = 0; j < this.bumps.length; j++) {
        //     this.bumps[j].position.z -= 1;
        //     if (this.bumps[j].position.z < -500) {
        //         // this.bumps[j].dispose();
        //         this.remove(this.bumps[j]);
        //         this.bumps[j].geometry.dispose();
        //         // this.bumps = this.bumps.slice(j, j);
        //     }
        // }
        // if (this.count >= 70) {
        //     this.newBump();
        //     this.count = 0;
        // }

        // this.geometry.computeFlatVertexNormals();

    }


}
export default Seafloor;