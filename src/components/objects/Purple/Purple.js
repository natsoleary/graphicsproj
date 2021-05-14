import { Group, Box3, Vector3, BoxGeometry, MeshBasicMaterial, Mesh, Object3D } from 'three';


// from https://poly.google.com/view/4cFllH6Iazk
// Credit: Poly by Google
class Purple extends Group {
  constructor(parent) {
    super();
    // const loader = new OBJLoader();
    this.name = 'purple';
    this.parent = parent;
    this.object = new Object3D();
    this.object.copy(parent.objects.purple);
    // this.object.position.set(x,y,z);
    this.add(this.object);

  }
  disposeOf() {

    this.remove(this.object);

    
  }
  delete() {

    this.parent.remove(this);

    this.remove(this.object);
  }
}

  export default Purple;