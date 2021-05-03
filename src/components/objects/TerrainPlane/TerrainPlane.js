import  SimplexNoise  from 'simplex-noise';
import { Group, Color, PlaneBufferGeometry, VertexColors, PlaneGeometry, MeshStandardMaterial, MeshLambertMaterial, Mesh} from 'three';


class TerrainPlane extends Group {
    constructor(parent) {

        super();

        // Init state
        this.state = {
            parent: parent,
            chunkWidth: 900,
            chunkVertWidth: 60,
            totalVertWidth: 60*3,
            xOffset: 0,
            yOffset: 0,
            zOffset: 0,
            octaves: 16,

        };

        this.brown = 0x00ff00;
        this.tan = 0x0000FF;
        this.orange = 0xCC5500;
        this.purple = 0xFF00FF;
        this.pink = 0xFF0000;

        this.state.xOffset = this.state.xOffset*this.state.chunkVertWidth/this.state.chunkWidth;
        this.state.zOffset = this.state.zOffset*this.state.chunkVertWidth/this.state.chunkWidth;

        // create the plane
        this.geometry = new PlaneGeometry(this.state.chunkWidth, this.state.chunkWidth,
            this.state.chunkVertWidth - 1, this.state.chunkVertWidth - 1);
        this.geometry.verticesNeedUpdate = true;
        this.geometry.colorsNeedUpdate = true;

        // get perline noise height map and update the geometry
        this.heightMap = this.generateTexture(this.state.xOffset, this.state.zOffset);
        this.updateTerrainGeo();

        //required for flat shading
        this.geometry.computeFlatVertexNormals()
        this.material = new MeshLambertMaterial({
            // wireframe:true,
            vertexColors: VertexColors,
            //required for flat shading
            flatShading:true,
        });
        const terrain = new Mesh(this.geometry, this.material);
        terrain.rotation.x = -Math.PI / 2;
        terrain.rotation.z = -Math.PI / 2;
        let groundY = -200; //-249;
        terrain.position.y = groundY - 1;
        terrain.rotation.x = -Math.PI / 2;
        terrain.receiveShadow = true;
        terrain.castShadow = true;
        this.add(terrain);
        
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
    map(val, smin, smax, emin, emax) {
        const t =  (val-smin)/(smax-smin)
        return (emax-emin)*t + emin
    }
    //stack some noisefields together
    octave(nx,ny,octaves, simplex, xOffset, zOffset) {
        let val = 0;
    //   let freq = this.state.parent.state.freq;
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
        var simplex = new SimplexNoise(4);

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
    updateTerrainGeo () {

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
            if(max <=15) return f.color.set(this.brown);
            if(max <=30)   return f.color.set(this.orange);
            if(max <=100)   return f.color.set(this.purple);
        
            //otherwise, return white
            else return f.color.set(this.pink);

        })
    }
}
export default TerrainPlane;