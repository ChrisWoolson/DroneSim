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
        var sphere2 = BABYLON.Mesh.CreateSphere("sphere2", 16, 2, scene);
        // Move the sphere upward 1/2 its height
        //sphere.position.y = 1;
        scene.attachControl(true,true,true);
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


    scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				switch (kbInfo.event.key) {
                    case "a":
                    case "A":
                        sphere.position.x -= 0.1;
                    break
                    case "d":
                    case "D":
                        sphere.position.x += 0.1;
                    break
                    case "w":
                    case "W":
                        sphere.position.y += 0.1;
                    break
                    case "s":
                    case "S":
                        sphere.position.y -= 0.1;
                    break
                    case "j":
                    case "J":
                        sphere2.position.x -= 0.1;
                    break
                    case "l":
                    case "L":
                        sphere2.position.x += 0.1;
                    break
                    case "i":
                    case "I":
                        sphere2.position.y += 0.1;
                    break
                    case "k":
                    case "K":
                        sphere2.position.y -= 0.1;
                    break
                }
			break;
		}
	});


        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

        //var xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        scene.onBeforeAnimationsObservable.add(function () {
            if(startAnimation){
                console.log('should now start the animation and trigger this codeblock once');
                startAnimation = false; //update the flag 
    
                console.log(xSlide);
    
                scene.beginDirectAnimation(box, [xSlide], 0, 2*10, true); //doesn't work
                //scene.beginDirectAnimation(sphere, [xSlide],0, 2*10, true)
                //BABYLON.Animation.CreateAndStartAnimation('zzz', box, 'rotation.z', 20, 20, 0.0, Math.PI / 2 , BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE); //works
            }
        });

        

        return scene;
    }

}

export function CreatePlaygroundScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
    return Playground.CreateScene(engine, canvas);
}
