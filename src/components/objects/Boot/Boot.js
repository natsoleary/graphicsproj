import { Group, Box3, Vector3, BoxGeometry, MeshBasicMaterial, Mesh, Object3D } from 'three';


// from https://poly.google.com/view/7HbqG8RwRcA
// Credit: Poly by Google
class Boot extends Group {
  constructor(parent) {
    super();
    // const loader = new OBJLoader();
    this.name = 'boot';
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
    this.object = new Object3D();
    this.object.copy(parent.objects.boot);
    this.object.position.set(x,y,z);
    this.add(this.object);
  }
  disposeOf() {
    this.boxmaterial.dispose();
    this.box.dispose();
    this.remove(this.BB);
    this.remove(this.object);

    
  }
  delete() {
    this.boxmaterial.dispose();
    this.box.dispose();
    this.remove(this.BB);
    this.parent.remove(this);

    this.remove(this.object);
  }
}

  export default Boot;