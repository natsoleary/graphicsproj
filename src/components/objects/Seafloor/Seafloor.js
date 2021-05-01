import { Group, Color, PlaneBufferGeometry, VertexColors, PlaneGeometry, MeshStandardMaterial, MeshLambertMaterial, Mesh, Vector2} from 'three';
const terrainSize = {width: 1000, height: 1000, vertsWidth: 100, vertsHeight: 100};

class Seafloor extends Group {
    constructor(parent) {

        super();
        // create the plane
        this.geometry = new PlaneGeometry(terrainSize.width,terrainSize.height,
            terrainSize.vertsWidth-1,terrainSize.vertsHeight-1);
                    //required for flat shading
        this.geometry.computeFlatVertexNormals();
        const terrain = new Mesh(this.geometry, new MeshLambertMaterial({
            // wireframe:true,
            vertexColors: VertexColors,
            //required for flat shading
            flatShading: true,
        }))
        console.log(terrain);
        // 82.4% red, 70.6% green and 54.9% blue.
        terrain.material.color.b = 0.2;
        terrain.material.color.g = 0.2;
        terrain.material.color.r = 0.2;

        // cube.material.color.setHex(  );

        // update location on the map
        let groundY = -200 //-249;
        terrain.position.y = groundY - 1;
        terrain.rotation.x = -Math.PI / 2;
        terrain.receiveShadow = true;

        this.addBumps();

        this.add(terrain);
        // Add self to parent's update list
        parent.addToUpdateList(this);
    }

    addBumps() {
        console.log(this.geometry);
        for (let j = 0; j < terrainSize.vertsHeight; j += 5) {
            for (let i = 0; i < terrainSize.vertsWidth; i++) {
                const index = (j*(terrainSize.vertsWidth)+i);
                // console.log(index);
                const vertex = this.geometry.vertices[index];
                vertex.z += 10;
        }
        }
    }
    update (timeStamp){
        var offset = 5*Math.sin(timeStamp/(5*1000));
        offset *= 10;
        // console.log(offset)
        for(let i = 0; i < this.geometry.vertices.length; i++) {
        //   console.log("z = " + this.geometry.vertices[i].z);
          if(this.geometry.vertices[i] > 0) {
            this.geometry.vertices[i].z = this.geometry.vertices[i].z + offset;
          }
        } 

        //console.log("TS = " + timeStamp + "(" + x + ", " + y + ", " + z + ")")
        this.geometry.computeFlatVertexNormals();

    }


}
export default Seafloor;