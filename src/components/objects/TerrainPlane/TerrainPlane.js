import { Group, Color, PlaneBufferGeometry, VertexColors, PlaneGeometry, MeshStandardMaterial, MeshLambertMaterial, Mesh, TextureLoader, Vector3, Box3, Euler} from 'three';
import  SimplexNoise  from 'simplex-noise';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import SAND from './sandgrain.jpeg';
import {Baby} from '../Baby';
import {Boot} from '../Boot';
import {Seaweed} from '../Seaweed';
import {Shark} from '../Shark';
import {Kelp} from '../Kelp';
// import MATERIAL from './PUSHLIN_kelp.mtl';



const terrainSize = {width: 1000, height: 1000, vertsWidth: 100, vertsHeight: 100};
const toRad = deg => deg * Math.PI/180



class TerrainPlane extends Group {

    constructor(parent, xOffset, yOffset, zOffset, planeGeometry) {
        // console.log("CONSTRUCTOR TERRAIN PLANE")
        // Call parent Group() constructor
        super();

        // Init state
        this.state = {
            parent: parent,
            chunkWidth: parent.state.chunkWidth,
            chunkVertWidth: parent.state.chunkVertWidth,
            totalVertWidth: parent.state.totalVertWidth,
            xOffset: xOffset,
            yOffset: yOffset,
            zOffset: zOffset,
            octaves: 10,
        };
        this.brown = 0x964B00;
        this.tan = 0xD2B48C;
        this.orange = 0xCC5500;
        this.purple = 0xFF00FF;
        this.red = 0x8a3324;
        this.green = 0x006400;
        this.darkbrown = 0x654321;
        this.gray = 0xD3D3D3;
        this.lavender = 0xE6E6FA;
        this.otherlavender = 0xdcd0ff;
        this.nextlightest = 0xdcd0ff;
        this.thirdlightest = 0xc9b7ff;
        this.fourthlightest = 0xb69dff;
        this.fifthlightest = 0xa384ff;
        this.darkest = 0x7d51ff;
        this.seconddarkest = 0x906bff;
        this.matrixAutoUpdate = true;


        this.state.xOffset = xOffset*parent.state.chunkVertWidth/parent.state.chunkWidth;
        this.state.zOffset = zOffset*parent.state.chunkVertWidth/parent.state.chunkWidth;

        // create the plane
        this.geometry = planeGeometry;
        this.geometry.verticesNeedUpdate = true;
        this.geometry.colorsNeedUpdate = true;
        this.babies = [];
        this.seaweeds = [];
        this.obstacles = [];
        this.sharks = [];

  
        // get perline noise height map and update the geometry
        this.heightMap = this.generateTexture(xOffset, zOffset);
        this.updateTerrainGeo();

        //required for flat shading
        this.geometry.computeFlatVertexNormals()
        this.rotateonce = false;
        // console.log(this.geometry)
        const textureLoader = new TextureLoader();
        // textureLoader.load(SAND, (texture)=> {
        //     this.material = new MeshLambertMaterial({
        //         // map: texture,
        //         // wireframe:true,
        //         vertexColors: VertexColors,
        //         //required for flat shading
        //         flatShading:true,
        //     });

      	//     });  
        this.material = new MeshLambertMaterial({
            vertexColors: VertexColors,
            //required for flat shading
            flatShading:true,
        })

        const terrain = new Mesh(this.geometry, this.material)
        const lowerTerrain = new Mesh(this.geometry, this.material)

        // update location on the map
        // let groundY = -200 //-249;
        // terrain.position.y = groundY - 1;
        terrain.rotation.x = -Math.PI / 2;
        terrain.rotation.z = -Math.PI / 2;
        terrain.receiveShadow = true;
        terrain.castShadow = true;

        lowerTerrain.rotation.x = -Math.PI / 2;
        lowerTerrain.rotation.z = -Math.PI / 2;
        lowerTerrain.receiveShadow = false;
        lowerTerrain.castShadow = false;
        lowerTerrain.position.y = -15;

        this.add(terrain);
        this.add(lowerTerrain);
        


    // console.log("from state", this.state.babyModel);

        this.spawnBabies();
        this.spawnObstacles();     
        this.spawnKelp();  
        

        // Add self to parent's update list
        // parent.addToUpdateList(this);

    }
    spawnBabies() {
        let baby = new Baby(this);
        let baby2 = new Baby(this);
        let baby3 = new Baby(this);
        
        this.add(baby);
        this.add(baby2);
        this.add(baby3);
        this.state.parent.state.parent.collidableMeshList.push(baby);
        this.state.parent.state.parent.collidableMeshList.push(baby2);
        this.state.parent.state.parent.collidableMeshList.push(baby3);


        this.babies.push(baby);
        this.babies.push(baby2);
        this.babies.push(baby3);  
       
    }
    spawnObstacles() {
        for (let i = 0; i < 10; i++) {
            let boot = new Boot(this);
            this.add(boot);
            this.state.parent.state.parent.obstacleList.push(boot);
            this.obstacles.push(boot);

        }
        for (let i = 0; i < 3; i++) {
            let shark = new Shark(this);
            this.add(shark);
            this.state.parent.state.parent.obstacleList.push(shark);
            this.obstacles.push(shark);
            this.sharks.push(shark);

        }

    }
    spawnKelp() {
        // if (!this.rotateonce) {
        //     if (this.geometry != undefined) {
        //     this.geometry.rotateX(toRad(90));
        //     this.rotateonce = true;
        //     }
        // }
            for (let i = 0; i < 5; i++) {
                let random = Math.round(Math.random()*6960);
                const f = this.geometry.faces[random]
                const v = this.geometry.vertices[f.a].clone();
                // let rotation  = new Euler(toRad(-90), 0,0, 'XYZ');
                // v.applyEuler(rotation);
                // let position = new Vector3(v.x,v.z,-v.y);





                // var position = new Vector3(vertx, verty, vertz); 
                // var position = Math.max(Math.max(face.c.z, Math.max(face.a.z, face.b.z)));
                // if (position != undefined) {
                    // console.log("appens");
                    let kelp = new Kelp(this, this.kelp);
                    kelp.position.set(v.y,v.z + 25,v.x);
                    this.add(kelp);

            // }
            // this.pl.push(shark);

        }


    }


    // spawnSeaweed() {
    //     var i = Math.round(Math.random()*(this.heightMap[0].length - 2));
    //     var j = Math.round(Math.random()*(this.heightMap.length -2));
    //     var index = j*(this.heightMap.length - 2) + i;
    //     //console.log(index);
    //     //const v1 = this.geometry.vertices[index];
    //     //console.log(v1.z);
    //     var random = Math.round(Math.random()*(this.geometry.faces.length - 1));
    //     //console.log(random);
    //     var face = this.geometry.faces[random];
    //     //console.log(face);
    //     var vert1 = this.geometry.vertices[face.a];
    //     var vert2 = this.geometry.vertices[face.b];
    //     var vert3 = this.geometry.vertices[face.c];

     

    //     //just don't set it if z is 0...
    //     // find a pattern to the fuck ups and fix them

        
    //     var onebig = false;
    //     var twobig = false;
    //     var threebig = false;
    //     var closest;

     
    //     if (vert1.z > vert2.z) {
    //       closest = vert1.z;
    //       onebig = true;
    //     }
    //     else {
    //       closest = vert2.z;
    //       twobig = true;
    //     }
    //     if (vert3.z > closest) {
    //       closest = vert3.z;
    //       threebig = true;
    //       twobig = false;
    //       onebig = false;
    //     }
    
    //     var y;
    //     // if (closest > 30 && closest < 40)
    //     // {
    //     //     y = closest + 30;
    //     // }
    //     y = closest;
    //     if (onebig)
    //     {
    //     var x = vert1.x;
    //     var z = vert1.y;
    //     }
    //     if (twobig)
    //     {
    //     var x = vert2.x;
    //     var z = vert2.y;
    //     }
    //     if (threebig)
    //     {
    //     var x = vert3.x;
    //     var z = vert3.y;
    //     }
    //     //console.log(x, y, z);
    
    //     if (y == 0)
    //     {
    //     let sea1 = new Seaweed(this, x, y, z);
    //     this.add(sea1);
    //     this.seaweeds.push(sea1);
    //     }
        
    // }

    updateTerrainGeo() {///
        //assign vert data from the canvas
        for(let j=0; j<this.heightMap.length; j++) {
            for (let i = 0; i < this.heightMap[0].length; i++) {
                const index = (j*(this.heightMap.length)+i);
                const v1 = this.geometry.vertices[index];
                v1.z = Math.pow(this.heightMap[j][i], Math.ceil(1))*200;
                v1.x += this.map(Math.random(),0,1,-0.5,0.5); //jitter x
                v1.y += this.map(Math.random(),0,1,-0.5,0.5); //jitter y

            }
        }

      this.geometry.faces.forEach(f=>{
        //get three verts for the face
        const a = this.geometry.vertices[f.a];
        const b = this.geometry.vertices[f.b];
        const c = this.geometry.vertices[f.c];
        
        // make flat seafloor 
        const avgz = (a.z+b.z+c.z)/3;
        if(avgz < 0) {
            a.z = 0;
            b.z = 0;
            c.z = 0;
        }
        const max = Math.max(a.z,Math.max(b.z,c.z));
        if(max <=0)   return f.color.set(this.tan);
        if(max <=15) return f.color.set(this.darkest);
        if(max <=30)   return f.color.set(this.seconddarkest);
        if (max <= 45) return f.color.set(this.fifthlightest);
        if (max <= 60) return f.color.set(this.fourthlightest);
        if (max <= 75) return f.color.set(this.thirdlightest)
        if(max <=100)   return f.color.set(this.nextlightest);
        if (max <= 115) return f.color.set(this.otherlavender);
     
        //otherwise, return white
        else return f.color.set(this.otherlavender);

    })

      this.geometry.verticesNeedUpdate = true;
      this.geometry.colorsNeedUpdate = true;
      this.geometry.computeFlatVertexNormals();
    }

    updateNoise() {
      this.heightMap = this.generateTexture();

      this.updateTerrainGeo();
    }

    // from https://medium.com/@joshmarinacci/low-poly-style-terrain-generation-8a017ab02e7b
    noise(nx, ny, simplex) {
        // Is in range -1.0:+1.0
        return simplex.noise2D(nx,ny);
    }
    //stack some noisefields together
    octave(nx,ny,octaves, simplex, xOffset, zOffset) {
        let val = 0;
        let freq = 1;
        let max = 0;
        let amp = 1; //this.state.amplitude;
        for(let i=0; i<octaves; i++) {
            val += this.noise(nx*freq, ny*freq, simplex)*amp;
            max += amp;
            amp /= 2;
            freq  *= 2;
        }
        return val/max;
    }

    //generate noise
    generateTexture() {

        // make 2d array
        var simplex = this.state.parent.state.simplex;

        const canvas = new Array(this.state.chunkVertWidth);
        for (var i = 0; i < canvas.length; i++) {
          canvas[i] = new Array(this.state.chunkVertWidth);
        }

        for(let i=0; i<this.state.chunkVertWidth; i++) {
            for(let j=0; j<this.state.chunkVertWidth; j++) {
                let v =  this.octave((i - this.state.chunkVertWidth - this.state.xOffset + 1 + Math.floor(this.state.xOffset/this.state.chunkVertWidth))/(this.state.totalVertWidth-3),
                                     (j + this.state.chunkVertWidth + this.state.zOffset - 1 - Math.floor(this.state.zOffset/this.state.chunkVertWidth))/(this.state.totalVertWidth-3),
                                      this.state.octaves, simplex)
                canvas[i][j] = v
            }
        }
        return canvas
    }
    map(val, smin, smax, emin, emax) {
        const t =  (val-smin)/(smax-smin)
        return (emax-emin)*t + emin
    }

    // Returns geometry to be reused
    disposeOf() {
      this.material.dispose();
      this.remove(this.children[0]);
      this.remove(this.children[1]);
    //   this.remove
      for (let baby of this.babies) {
          baby.disposeOf();
      }
      for (let obstacle of this.obstacles) {
        obstacle.disposeOf();
    }

      return this.geometry;
    }
    setTerrainPosition(x, y, z) {
        this.position.x = x;
        this.position.z = z;
        this.position.y = y;
        this.updateMatrix();


      }
      updateSharks(timeStamp) {
          for (let shark of this.sharks) {
              shark.update(timeStamp);
          }
      }
    // update(xneg, zneg, offset) {
    //     for (let sea of this.seaweeds) {
    //         sea.update(xneg, zneg, offset);   
    //     }
    // }


}

export default TerrainPlane;