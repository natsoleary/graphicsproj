import { Group, Box3, Vector3, BoxGeometry, MeshBasicMaterial, Mesh, Object3D } from 'three';


// const xsize = 0.0676427978515;
// const ysize = 0.020390990448;
// const zsize = 164.0717635986329;
const xsize = 100;
const ysize = 100;
const zsize = 100;

class Baby extends Group {
    constructor(parent) {
        super();
        this.name = "Baby";
        this.parent = parent;
        let x = Math.random() * 1500;
        let y = 70 + Math.random() * 50;
        let z = Math.random() * 1500;
        this.position.set(x,y,z)
        this.box = new BoxGeometry(10, 10, 10);
        this.boxmaterial = new MeshBasicMaterial( { color: 0x9999ff} );
        var boundbox = new Mesh( this.box, this.boxmaterial );
        boundbox.position.set(x,y,z);
        boundbox.visible = false;
        this.BB = boundbox;
        this.add(this.BB);
        this.baby = new Object3D();
        this.baby.copy(parent.objects.baby);
        this.baby.position.set(x,y,z);
        this.add(this.baby);        // const loader = new OBJLoader();



    }
    disposeOf() {
      this.boxmaterial.dispose();
      this.box.dispose();

      for (let child of this.baby.children) {
        // console.log(child);
        child.geometry.dispose();
        // console.log(child.material);
        for (let material of child.material) {
          material.dispose();
        }
        // child.material.dispose();
      }
      this.remove(this.BB);
      this.remove(this.baby);

      
    }
    delete() {
      this.boxmaterial.dispose();
      this.box.dispose();
      this.remove(this.BB);
      this.parent.remove(this);

      this.remove(this.baby);
    }

}
export default Baby;