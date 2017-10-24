import { Engine, Vector } from "excalibur";

import { Resources } from "../resources";
import { RlLoader, SceneManager} from "./";

export class Game extends Engine {

    public loader: RlLoader;
    public sceneManager: SceneManager;

    constructor() {
        const defaultWidth: number = 800;
        const defaultHeight: number = 600;

        super({ 
            width: defaultWidth,
            height: defaultHeight
        });

        console.log("Game object", this);
    }

    public setup(
        loader: RlLoader) {

        this.loader = loader;
        
        const sceneManager = new SceneManager(
            this, 
            this.loader);

        this.sceneManager = sceneManager;
    }

    public screenToWorldCoordinates(point: Vector): Vector {

        console.log("override");

        let newX = point.x;
        let newY = point.y;
  
        // transform back to world space
        newX = (newX / this.canvas.clientWidth) * this.getDrawWidth();
        newY = (newY / this.canvas.clientHeight) * this.getDrawHeight();
  
  
        // transform based on zoom
        // newX = newX - this.getDrawWidth() / 2;
        newY = newY - this.getDrawHeight() / 2;
  
        // shift by focus
        if (this.currentScene && this.currentScene.camera) {
           var focus = this.currentScene.camera.getFocus();
           newX += focus.x;
           newY += focus.y;
        }
  
        return new Vector(Math.floor(newX), Math.floor(newY));
    }
}