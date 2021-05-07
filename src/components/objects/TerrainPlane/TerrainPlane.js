import { Group, Color, PlaneBufferGeometry, VertexColors, PlaneGeometry, MeshStandardMaterial, MeshLambertMaterial, Mesh, TextureLoader, Vector3} from 'three';
import  SimplexNoise  from 'simplex-noise';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader.js';
import MODEL from './NOVELO_TURTLE.obj';
import MAT from './NOVELO_TURTLE.mtl';
import SAND from './sandgrain.jpeg';
import {Baby} from '../Baby';


const terrainSize = {width: 1000, height: 1000, vertsWidth: 100, vertsHeight: 100};


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
            babyModel: null,

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

        this.state.xOffset = xOffset*parent.state.chunkVertWidth/parent.state.chunkWidth;
        this.state.zOffset = zOffset*parent.state.chunkVertWidth/parent.state.chunkWidth;

        // create the plane
        this.geometry = planeGeometry;
        this.geometry.verticesNeedUpdate = true;
        this.geometry.colorsNeedUpdate = true;

        // get perline noise height map and update the geometry
        this.heightMap = this.generateTexture(xOffset, zOffset);
        this.updateTerrainGeo();

        //required for flat shading
        this.geometry.computeFlatVertexNormals()
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

        // Add self to parent's update list
        // parent.addToUpdateList(this);

    }
    spawnBabies() {
        // console.log("in here", this.state.babyModel)
        // this.state.babyModel.position.x = 5;
        // this.state.babyModel.position.z = 5;
        // this.state.babyModel.position.y = -180;
        let baby = new Baby(this);
        let baby2 = new Baby(this);
        let baby3 = new Baby(this);
        console.log("wtf", baby.real_position);
        console.log("parent route", this.state.babyModel);
        console.log("model route", baby.state.model);
        // console.log(baby.geometry);
        
        this.add(baby);
        this.add(baby2);
        this.add(baby3);

        
       
    }

    updateTerrainGeo() {
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
        else return f.color.set(this.pink);

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
        let freq = this.state.parent.state.freq;
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

        // console.log("terrain with offset " + this.state.xOffset + " " + this.state.zOffset)
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
                                      this.state.parent.state.octaves, simplex)
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

      return this.geometry;
    }
    setTerrainPosition(x, y, z) {
        this.position.x = x;
        this.position.z = z;
        this.position.y = y;
        this.updateMatrix();
      }

}

export default TerrainPlane;