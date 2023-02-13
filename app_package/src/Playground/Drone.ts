import * as BABYLON from "@babylonjs/core";
import { DirectionalLight } from "@babylonjs/core";
import "@babylonjs/loaders";
export class Drone{
    positionVector: BABYLON.Vector3;
    speed: number;

    box :BABYLON.Mesh;
    tickCount:number;
    angle1:number;
    angle2:number;

constructor(x:number, y:number, z:number, scene: BABYLON.Scene){
    this.positionVector = new BABYLON.Vector3(x,y,z);
    
    this.speed = Math.random()*.05+.015;
    
    this.tickCount = Math.random()*100+100;
    this.angle1 = Math.random()*(2*Math.PI);
    this.angle2 = Math.random()*(2*Math.PI);

    const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
    boxMat.diffuseTexture = new BABYLON.Texture("https://c8.alamy.com/comp/MJNNA2/drone-toy-sketch-MJNNA2.jpg", scene);

    
    this.box = BABYLON.MeshBuilder.CreateBox("box", {size:1, width:1, height:1, depth:1}, scene);
    this.box.material = boxMat;
    // this.box = BABYLON
}

//runs each frame
    tick(): void{
        this.tickCount--;
        if(this.tickCount <= 0){
            this.changeDirection();
            this.tickCount = Math.random()*1000+500;
        }
        this.move();
        
        this.box.position.x= this.positionVector.x;
        this.box.position.y = this.positionVector.y;
        this.box.position.z = this.positionVector.z;
        //console.log(this.box.position.x+" "+this.box.position.y+" "+this.box.position.z);
   }

   move():void{

    this.checkBoundries();

    this.positionVector.x+= this.speed*Math.cos(this.angle1);
    this.positionVector.z+= this.speed*Math.sin(this.angle1);
    this.positionVector.y+= this.speed*Math.sin(this.angle2);
   }

   changeDirection(): void{
    this.angle1 = (Math.random()*2*Math.PI);
    this.angle2 = (Math.random()*2*Math.PI);
   }

   checkBoundries():void{
    if(this.positionVector.x<=-50 || this.positionVector.x >=50 || this.positionVector.z<=-50 || this.positionVector.z >=50){
        this.angle1+=Math.PI;
    }
    if(this.positionVector.y<=0 || this.positionVector.y>=100){
        this.angle2+=Math.PI;
    }
   }

}