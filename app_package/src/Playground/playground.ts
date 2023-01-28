import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";

class Playground {
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // This creates and positions a free camera (non-mesh)
        var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 5, -10), scene);

        // This targets the camera to scene origin
        camera.setTarget(BABYLON.Vector3.Zero());
        var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
        // This attaches the camera to the canvas
        camera.attachControl(canvas, true);

        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);

        // Move the sphere upward 1/2 its height
        //sphere.position.y = 1;
        var xSlide = new BABYLON.Animation("xSlide", "position.x", 10, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        var keyFramesP = []; 

    keyFramesP.push({
        frame: 0,
        value: 2
    });

    keyFramesP.push({ 
        frame: 10,
        value: -2
    });

    keyFramesP.push({
        frame: 2 * 10,
        value: 2
    });

    var startAnimation = true;
    
    xSlide.setKeys(keyFramesP);
        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

        //var xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        scene.onBeforeAnimationsObservable.add(function () {
            if(startAnimation){
                console.log('should now start the animation and trigger this codeblock once');
                startAnimation = false; //update the flag 
    
                console.log(xSlide);
    
                scene.beginDirectAnimation(box, [xSlide], 0, 2*10, true); //doesn't work
    
                //BABYLON.Animation.CreateAndStartAnimation('zzz', box, 'rotation.z', 20, 20, 0.0, Math.PI / 2 , BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE); //works
            }
        });
        return scene;
    }

}

export function CreatePlaygroundScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
    return Playground.CreateScene(engine, canvas);
}
