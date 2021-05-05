import { Group, Color, PlaneGeometry, PlaneBufferGeometry, Vector2, TextureLoader, Reflector, Refractor } from 'three';
import  SimplexNoise  from 'simplex-noise';
import { TerrainPlane } from '../TerrainPlane';


/*
      [0][1][2]
      [3][4][5]
      [6][7][8]
USING THIS ARRAY STRUCTURE
*/

// SET THESE TO CHANGE CHUNK DIMENSIONS
const startYBelow = 200;
const chunkPxWidth = 900;
const chunkVertexWidth = 60;


class TerrainManager extends Group {
    constructor(parent) {
        // Call parent Group() constructor
        super();

        this.name = "TerrainManager"

        // Init state
        this.state = {
            gui: parent.state.gui,
            parent: parent,
            terrain_chunks: [],
            chunkWidth: chunkPxWidth,
            chunkVertWidth: chunkVertexWidth,
            simplex: {},
            totalVertWidth: chunkVertexWidth*3, // chunkVertWidth * 3
            currentXOffset: 0,
            currentZOffset: 0,
            power: 1,
            octaves: 16,
            exaggeration: 20,
            ogExaggeration: 20,
            randSeed: 4,
            freq: 1,
            terraced: false,
            terraces: 15,

        };

        this.state.simplex = new SimplexNoise(this.state.randSeed);

        const coordinates = [
          [this.state.chunkWidth, 0, this.state.chunkWidth],
          [0, 0, this.state.chunkWidth],
          [-this.state.chunkWidth, 0, this.state.chunkWidth],
          [this.state.chunkWidth, 0, 0],
          [0, 0, 0],
          [-this.state.chunkWidth, 0, 0],
          [this.state.chunkWidth, 0, -this.state.chunkWidth],
          [0, 0, -this.state.chunkWidth],
          [-this.state.chunkWidth, 0, -this.state.chunkWidth]
        ]

        for (let i = 0; i < coordinates.length; i++) {
          let new_plane_geo = new PlaneGeometry(this.state.chunkWidth, this.state.chunkWidth,
                                      this.state.chunkVertWidth - 1, this.state.chunkVertWidth - 1);
          const new_chunk = new TerrainPlane(this, coordinates[i][0], coordinates[i][1], coordinates[i][2], new_plane_geo);
          this.add(new_chunk);
          this.state.terrain_chunks.push(new_chunk);
        }

        // Add self to parent's update list
        parent.addToUpdateList(this);

    }


    updateSimplexSeed() {
      this.state.simplex = new SimplexNoise(this.state.randSeed);

      this.updateNoise();
    }

    updateNoise() {
      for(let chunk of this.state.terrain_chunks) {
        chunk.updateNoise();
      }
    }

    updateExaggeration() {
      this.state.exaggeration = this.state.ogExaggeration;
      this.updateTerrainGeo()
    }

    updateTerrainGeo() {
      for(let chunk of this.state.terrain_chunks) {
        chunk.updateTerrainGeo();
      }
    }


    update(timeStamp, x, y, z) {
      // console.log("Update in chunk manager. x: " + x + " y: " + y + " z: " + z)
      // make/delete chunks as needed
      // Initialized as a 0 but are actually supposed to be PlaneGeometry objects
      let plane_geos = [0, 0, 0];
      let need_update = (z > this.state.chunkWidth/2) || (z < -this.state.chunkWidth/2)
      || (x > this.state.chunkWidth/2) || (x < -this.state.chunkWidth/2);

      if(z > this.state.chunkWidth/2) {
        this.state.currentZOffset += this.state.chunkWidth;
        this.state.parent.state.z -= this.state.chunkWidth;

        this.remove(this.state.terrain_chunks[6])
        this.remove(this.state.terrain_chunks[7])
        this.remove(this.state.terrain_chunks[8])
        plane_geos[0] = this.state.terrain_chunks[6].disposeOf();
        plane_geos[1] = this.state.terrain_chunks[7].disposeOf()
        plane_geos[2] = this.state.terrain_chunks[8].disposeOf()

        // move everything a row back. Chunks[] help us keep track of this
        this.state.terrain_chunks[6] = this.state.terrain_chunks[3]
        this.state.terrain_chunks[7] = this.state.terrain_chunks[4]
        this.state.terrain_chunks[8] = this.state.terrain_chunks[5]

        this.state.terrain_chunks[3] = this.state.terrain_chunks[0]
        this.state.terrain_chunks[4] = this.state.terrain_chunks[1]
        this.state.terrain_chunks[5] = this.state.terrain_chunks[2]

        // make new chunks with proper offset
        this.state.terrain_chunks[0] = new TerrainPlane(this, this.state.chunkWidth + this.state.currentXOffset, 0, this.state.chunkWidth + this.state.currentZOffset, plane_geos
        [0]);
        this.state.terrain_chunks[1] = new TerrainPlane(this, this.state.currentXOffset, 0, this.state.chunkWidth + this.state.currentZOffset,plane_geos
        [1]);
        this.state.terrain_chunks[2] = new TerrainPlane(this, -this.state.chunkWidth + this.state.currentXOffset, 0, this.state.chunkWidth + this.state.currentZOffset,plane_geos
        [2]);

        this.add(this.state.terrain_chunks[0])
        this.add(this.state.terrain_chunks[1])
        this.add(this.state.terrain_chunks[2])

      }
      else if(z < -this.state.chunkWidth/2) {
        this.state.currentZOffset -= this.state.chunkWidth;
        this.state.parent.state.z += this.state.chunkWidth;

        this.remove(this.state.terrain_chunks[0])
        this.remove(this.state.terrain_chunks[1])
        this.remove(this.state.terrain_chunks[2])
        plane_geos[0] = this.state.terrain_chunks[0].disposeOf()
        plane_geos[1] = this.state.terrain_chunks[1].disposeOf()
        plane_geos[2] = this.state.terrain_chunks[2].disposeOf()


        // move everything a row forward. Chunks[] help us keep track of this
        this.state.terrain_chunks[0] = this.state.terrain_chunks[3]
        this.state.terrain_chunks[1] = this.state.terrain_chunks[4]
        this.state.terrain_chunks[2] = this.state.terrain_chunks[5]

        this.state.terrain_chunks[3] = this.state.terrain_chunks[6]
        this.state.terrain_chunks[4] = this.state.terrain_chunks[7]
        this.state.terrain_chunks[5] = this.state.terrain_chunks[8]

        // make new chunks with proper offset
        this.state.terrain_chunks[6] = new TerrainPlane(this, this.state.chunkWidth + this.state.currentXOffset, 0, -this.state.chunkWidth + this.state.currentZOffset,plane_geos
        [0]);
        this.state.terrain_chunks[7] = new TerrainPlane(this, this.state.currentXOffset, 0, -this.state.chunkWidth + this.state.currentZOffset,plane_geos
        [1]);
        this.state.terrain_chunks[8] = new TerrainPlane(this, -this.state.chunkWidth + this.state.currentXOffset, 0, -this.state.chunkWidth + this.state.currentZOffset,plane_geos
        [2]);

        this.add(this.state.terrain_chunks[6])
        this.add(this.state.terrain_chunks[7])
        this.add(this.state.terrain_chunks[8])

      }


      else if(x > this.state.chunkWidth/2) {

        this.state.currentXOffset += this.state.chunkWidth;
        this.state.parent.state.x -= this.state.chunkWidth;

        this.remove(this.state.terrain_chunks[2])
        this.remove(this.state.terrain_chunks[5])
        this.remove(this.state.terrain_chunks[8])
        plane_geos[0] = this.state.terrain_chunks[2].disposeOf()
        plane_geos[1] = this.state.terrain_chunks[5].disposeOf()
        plane_geos[2] = this.state.terrain_chunks[8].disposeOf()


        // move everything a column right. Chunks[] help us keep track of this
        this.state.terrain_chunks[2] = this.state.terrain_chunks[1]
        this.state.terrain_chunks[5] = this.state.terrain_chunks[4]
        this.state.terrain_chunks[8] = this.state.terrain_chunks[7]

        this.state.terrain_chunks[1] = this.state.terrain_chunks[0]
        this.state.terrain_chunks[4] = this.state.terrain_chunks[3]
        this.state.terrain_chunks[7] = this.state.terrain_chunks[6]

        // make new chunks with proper offset
        this.state.terrain_chunks[0] = new TerrainPlane(this, this.state.chunkWidth + this.state.currentXOffset, 0, this.state.chunkWidth + this.state.currentZOffset,plane_geos
        [0]);
        this.state.terrain_chunks[3] = new TerrainPlane(this, this.state.chunkWidth + this.state.currentXOffset, 0, this.state.currentZOffset,plane_geos
        [1]);
        this.state.terrain_chunks[6] = new TerrainPlane(this, this.state.chunkWidth + this.state.currentXOffset, 0, -this.state.chunkWidth + this.state.currentZOffset,plane_geos
        [2]);

        this.add(this.state.terrain_chunks[0])
        this.add(this.state.terrain_chunks[3])
        this.add(this.state.terrain_chunks[6])

      }

      else if(x < -this.state.chunkWidth/2) {
        this.state.currentXOffset -= this.state.chunkWidth;
        this.state.parent.state.x += this.state.chunkWidth;

        this.remove(this.state.terrain_chunks[0])
        this.remove(this.state.terrain_chunks[3])
        this.remove(this.state.terrain_chunks[6])
        plane_geos[0] = this.state.terrain_chunks[0].disposeOf()
        plane_geos[1] = this.state.terrain_chunks[3].disposeOf()
        plane_geos[2] = this.state.terrain_chunks[6].disposeOf()


        // move everything a column left. Chunks[] help us keep track of this
        this.state.terrain_chunks[0] = this.state.terrain_chunks[1]
        this.state.terrain_chunks[3] = this.state.terrain_chunks[4]
        this.state.terrain_chunks[6] = this.state.terrain_chunks[7]

        this.state.terrain_chunks[1] = this.state.terrain_chunks[2]
        this.state.terrain_chunks[4] = this.state.terrain_chunks[5]
        this.state.terrain_chunks[7] = this.state.terrain_chunks[8]

        // make new chunks with proper offset
        this.state.terrain_chunks[2] = new TerrainPlane(this, -this.state.chunkWidth + this.state.currentXOffset, 0, this.state.chunkWidth + this.state.currentZOffset, plane_geos
        [0]);
        this.state.terrain_chunks[5] = new TerrainPlane(this, -this.state.chunkWidth + this.state.currentXOffset, 0, this.state.currentZOffset, plane_geos
        [1]);
        this.state.terrain_chunks[8] = new TerrainPlane(this, -this.state.chunkWidth + this.state.currentXOffset, 0, -this.state.chunkWidth + this.state.currentZOffset, plane_geos
        [2]);

        this.add(this.state.terrain_chunks[2])
        this.add(this.state.terrain_chunks[5])
        this.add(this.state.terrain_chunks[8])


      }
      if (need_update) {
        // move all pieces to correct position relative to center block
        // top row
        this.state.terrain_chunks[0].setTerrainPosition(this.state.chunkWidth, 0, this.state.chunkWidth)
        this.state.terrain_chunks[1].setTerrainPosition(0, 0, this.state.chunkWidth)
        this.state.terrain_chunks[2].setTerrainPosition(-this.state.chunkWidth, 0, this.state.chunkWidth)
        // middle row
        this.state.terrain_chunks[3].setTerrainPosition(this.state.chunkWidth, 0, 0)
        this.state.terrain_chunks[4].setTerrainPosition(0, 0, 0)
        this.state.terrain_chunks[5].setTerrainPosition(-this.state.chunkWidth, 0, 0)
        // bottom row
        this.state.terrain_chunks[6].setTerrainPosition(this.state.chunkWidth, 0, -this.state.chunkWidth)
        this.state.terrain_chunks[7].setTerrainPosition(0, 0, -this.state.chunkWidth)
        this.state.terrain_chunks[8].setTerrainPosition(-this.state.chunkWidth, 0, -this.state.chunkWidth)
      }

      this.position.x = -x;
      this.position.y = y - startYBelow;
      this.position.z = -z;
      for (let chunk of this.state.terrain_chunks) {
        // chunk.spawnBabies();
      }

    }


}

export default TerrainManager;