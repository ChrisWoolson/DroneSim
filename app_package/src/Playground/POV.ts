import * as BABYLON from "@babylonjs/core";
import { DirectionalLight } from "@babylonjs/core";
import "@babylonjs/loaders";
export class POV{
    positionVector: BABYLON.Vector3;
    speedVector: BABYLON.Vector3;

    isXIncKey:boolean;
    isXDecKey: boolean;

    isYIncKey: boolean;
    isYDecKey: boolean;

    isZIncKey: boolean;
    isZDecKey: boolean;
    camera :BABYLON.FreeCamera;
constructor(x:number, y:number, z:number, scene: BABYLON.Scene, canvas: HTMLCanvasElement){
    this.positionVector = new BABYLON.Vector3(x,y,z);
    this.speedVector = new BABYLON.Vector3(0,0,0);

    this.isXIncKey=false;
    this.isXDecKey=false;

    this.isYIncKey=false;
    this.isYDecKey=false;

    this.isZIncKey=false;
    this.isZDecKey=false;

    this.camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(x,y,z), scene);
    this.camera.setTarget(BABYLON.Vector3.Zero());
        //var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
        // This attaches the camera to the canvas
    this.camera.attachControl(canvas, true);
    // this.box = BABYLON
}
tick(): void{
    this.move();
    
    this.camera.position.x= this.positionVector.x;
    this.camera.position.y = this.positionVector.y;
    this.camera.position.z = this.positionVector.z;
    console.log(this.camera.position.x+" "+this.camera.position.y+" "+this.camera.position.z);
}

move():void{
var set = {directionPosition:this.positionVector.x, directionSpeed: this.speedVector.x};
this.moveDirection(set, this.isXIncKey, this.isXDecKey);
this.positionVector.x = set.directionPosition;
this.speedVector.x = set.directionSpeed;

set = {directionPosition:this.positionVector.y, directionSpeed: this.speedVector.y};
this.moveDirection(set, this.isYIncKey, this.isYDecKey);
this.positionVector.y = set.directionPosition;
this.speedVector.y = set.directionSpeed;

set = {directionPosition:this.positionVector.z, directionSpeed: this.speedVector.z};
this.moveDirection(set, this.isZIncKey, this.isZDecKey);
this.positionVector.z = set.directionPosition;
this.speedVector.z = set.directionSpeed;
}


moveDirection(model: {directionPosition: number, directionSpeed:number}, incKey:boolean, decKey:boolean){

if(incKey == decKey){
    if(model.directionSpeed>0){model.directionSpeed-=0.001;} 
    else if(model.directionSpeed<0){model.directionSpeed+=0.001;}
    if( Math.abs(model.directionSpeed)<=0.002 ){
        model.directionSpeed = 0;
    }
    
}
else if(incKey && model.directionSpeed<2){
    model.directionSpeed+=0.002;
}
else if(decKey&& model.directionSpeed<2){
    model.directionSpeed-=0.002;
}

model.directionPosition = model.directionPosition+model.directionSpeed;

//return model;
}
}