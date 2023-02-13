import * as BABYLON from "@babylonjs/core";
import "@babylonjs/loaders";
import {Drone} from './Drone';
import {Wall} from './Wall';
import {POV} from './POV';

class Playground {
        
    public static CreateScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
        // This creates a basic Babylon Scene object (non-mesh)
        var scene = new BABYLON.Scene(engine);

        // This creates and positions a free camera (non-mesh)
        var x = 0;
        var y = 5;
        var z = 10;
        var droneList = new Array<Drone>;

        var camera = new POV(0,5,10, scene, canvas);


        // This targets the camera to scene origin
        //camera.setTarget(BABYLON.Vector3.Zero());
        //var box = BABYLON.MeshBuilder.CreateBox("box", {}, scene);
        // This attaches the camera to the canvas
       // camera.attachControl(canvas, true);


        //var d = BABYLON.SceneLoader.ImportMesh("", "/scene/", "drone.obj", scene);
        // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
        var light = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0, 1, 0), scene);

        // Default intensity is 1. Let's dim the light a small amount
        light.intensity = 0.7;

        // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
        //var sphere = BABYLON.Mesh.CreateSphere("sphere1", 16, 2, scene);
        //var sphere2 = BABYLON.Mesh.CreateSphere("sphere2", 16, 2, scene);
        for(var i = 0; i<5; i++){
            droneList.push(new Drone(Math.random()*100-50, Math.random()*100, Math.random()*100-50, scene));
        }
        //var drone = new Drone(0,0,0,scene);
  
        var ground = new Wall(0,0,0,100,.5,100, "https://t3.ftcdn.net/jpg/03/09/60/44/360_F_309604437_Xn7I5GsNKEUNwUOJIKQopth8GfilQvxo.jpg", scene);
        var ground2 = new Wall(0,100,0,100,.5,100, "https://images.pexels.com/photos/53594/blue-clouds-day-fluffy-53594.jpeg?auto=compress&cs=tinysrgb&w=800", scene);
        
        var wall1 = new Wall(0,50,-50,100,100,.5,"https://s3-external-1.amazonaws.com/youvisit-img/Assets/img/locations/80229/1280_profile.jpg?v=1645658835", scene);
        var wall2 = new Wall(0,50,50,100,100,.5,"https://pfeifferpartners.com/wp-content/uploads/2016/03/pfeiffer-ucsb-lib-ext-dusk-1-L1.jpg", scene);

        var wall3 = new Wall(50,50,0,.5,100,100,"https://s3-external-1.amazonaws.com/youvisit-img/Assets/img/locations/80229/1280_profile.jpg?v=1645658835", scene);
        var wall4 = new Wall(-50,50,0,.5,100,100,"https://pfeifferpartners.com/wp-content/uploads/2016/03/pfeiffer-ucsb-lib-ext-dusk-1-L1.jpg", scene);
        scene.attachControl(true,true,true);
        //var xSlide = new BABYLON.Animation("xSlide", "position.x", 10, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
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
    
    //xSlide.setKeys(keyFramesP);


    scene.onKeyboardObservable.add((kbInfo) => {
		switch (kbInfo.type) {
			case BABYLON.KeyboardEventTypes.KEYDOWN:
				switch (kbInfo.event.key) {
                    case "a":
                    case "A":
                        camera.isXIncKey=true;
                        
                    break
                    case "d":
                    case "D":
                        camera.isXDecKey=true;
                       
                    break
                    case "w":
                    case "W":
                        camera.isZDecKey=true;

                    break
                    case "s":
                    case "S":
                        camera.isZIncKey = true;
                    break
                    case "r":
                    case "R":
                        camera.isYDecKey = true;
                    break
                    case "f":
                    case "F":
                        camera.isYIncKey = true;
                    break
                }
			break;
            case BABYLON.KeyboardEventTypes.KEYUP:
				switch (kbInfo.event.key) {
                    case "a":
                    case "A":
                        camera.isXIncKey=false;
                    break
                    case "d":
                    case "D":
                        camera.isXDecKey=false;
                    break
                    case "w":
                    case "W":
                        camera.isZDecKey=false;
                    break
                    case "s":
                    case "S":
                        camera.isZIncKey = false;
                    break
                    case "r":
                    case "R":
                        camera.isYDecKey = false;
                    break
                    case "f":
                    case "F":
                        camera.isYIncKey = false;
                    break
                }
			break;
		
		}
	});


        // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
        //var ground = BABYLON.Mesh.CreateGround("ground1", 6, 6, 2, scene);

        //var xSlide = new BABYLON.Animation("xSlide", "position.x", frameRate, BABYLON.Animation.ANIMATIONTYPE_FLOAT, BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE);
        scene.onBeforeAnimationsObservable.add(function () {
            if(startAnimation){
                console.log('should now start the animation and trigger this codeblock once');
                startAnimation = false; //update the flag 
    
                //console.log(xSlide);
    
                //scene.beginDirectAnimation(box, [xSlide], 0, 2*10, true); //doesn't work
                //scene.beginDirectAnimation(sphere, [xSlide],0, 2*10, true)
                //BABYLON.Animation.CreateAndStartAnimation('zzz', box, 'rotation.z', 20, 20, 0.0, Math.PI / 2 , BABYLON.Animation.ANIMATIONLOOPMODE_CYCLE); //works
            }
        });

        //tick function runs BEFORE each frame
        scene.registerBeforeRender(function () {
            camera.tick();
            droneList.forEach(element => {
                element.tick();
            });
          });
        

        return scene;
    }
    
}

export function CreatePlaygroundScene(engine: BABYLON.Engine, canvas: HTMLCanvasElement): BABYLON.Scene {
    return Playground.CreateScene(engine, canvas);
}
