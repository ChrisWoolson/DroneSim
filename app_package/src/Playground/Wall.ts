import * as BABYLON from "@babylonjs/core";
import { DirectionalLight } from "@babylonjs/core";
import "@babylonjs/loaders";

export class Wall{

    panel:BABYLON.Mesh;
    positionVector: BABYLON.Vector3;
    width: number;
    height: number;
    depth: number;
    image: string;

    constructor(x: number, y: number, z: number, width: number, height: number, depth: number, image: string, scene: BABYLON.Scene){
        this.positionVector = new BABYLON.Vector3(x,y,z);
    
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.image = image;

        const boxMat = new BABYLON.StandardMaterial("boxMat", scene);
        boxMat.diffuseTexture = new BABYLON.Texture(image, scene);


        this.panel = BABYLON.MeshBuilder.CreateBox("box", {width: this.width, height: this.height, depth:this.depth, wrap: true}, scene);

        this.panel.position.x = this.positionVector.x;
        this.panel.position.y = this.positionVector.y;
        this.panel.position.z = this.positionVector.z;

        this.panel.material = boxMat;

        }

}