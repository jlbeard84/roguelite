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
}