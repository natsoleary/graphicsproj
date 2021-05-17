import { Group, Box3, Vector3, Vector2, BoxGeometry, MeshBasicMaterial, Mesh, Object3D } from 'three';

// from https://poly.google.com/view/1mVWW4RFVHc
// Credit: Poly by Google
class Shark extends Group {
  constructor(parent) {
    super();
    this.parent = parent;
    let x = Math.random() * 2000;
    let y = 50 + Math.random() * 100;
    let z = Math.random() * 2000;
    this.position.set(x,y,z)
    this.box = new BoxGeometry(50, 15, 15);
    this.box.rotateY(Math.PI/2);
    this.boxmaterial = new MeshBasicMaterial( { color: 0x9999ff} );
    var boundbox = new Mesh( this.box, this.boxmaterial );
    boundbox.position.set(x,y,z);
    boundbox.visible = false;
    this.BB = boundbox;
    this.add(this.BB);
    // const loader = new OBJLoader();
    this.name = 'shark';
    this.shark = new Object3D();
    this.shark.copy(parent.objects.shark);
    this.shark.position.set(x,y,z);
    this.add(this.shark);
    this.count = 0;
    this.startposition = this.position;
    this.prevTimestamp = null;
    this.cumulative = 0;

  }

update(timeStamp) {
   // move Shark
   if (this.shark != undefined) {
     if (timeStamp != this.prevTimestamp) {
    //  console.log(timeStamp)
    let oldSharkLocation = new Vector2(this.shark.position.x, this.shark.position.z);
    let newSharkLocation = new Vector2(200*Math.cos(timeStamp/500), 200*Math.sin(timeStamp/500));
    let nextLocation = new Vector2(200*Math.cos((timeStamp + 1)/500), 200*Math.sin((timeStamp + 1)/500));
    let sharkDifference = oldSharkLocation.clone().sub(newSharkLocation);
    let sharkAng = Math.abs(sharkDifference.angle());
    // let lookAt = new Vector3(nextLocation.x, this.shark.position.y, nextLocation.z);
    // this.shark.lookAt(lookAt);
    this.shark.rotateY(-1 *1/50* sharkAng);
    // console.log(sharkAng);
    this.cumulative += sharkAng;
    this.shark.position.x = 200*Math.cos(timeStamp/500);
    this.shark.position.z = 200*Math.sin(timeStamp/500);
    this.BB.rotateY(-1 *1/50* sharkAng);
    this.BB.position.x = 200*Math.cos(timeStamp/500);
    this.BB.position.z = 200*Math.sin(timeStamp/500);   
    // if (this.cumulative >= 2* Math.PI)  {
    //   console.log(this.count)
    // }
    this.prevTimestamp = timeStamp;

    this.count++;
    // this.shark.rotateOnAxis(this.rotation_axis, Math.PI/10);
  }
}
}
disposeOf() {
  this.boxmaterial.dispose();
  this.box.dispose();
  this.remove(this.BB);
  this.remove(this.shark)

  
}
delete() {
  this.boxmaterial.dispose();
  this.box.dispose();
  this.remove(this.BB);
  this.parent.remove(this);

  this.remove(this.shark);
}
}
  export default Shark;