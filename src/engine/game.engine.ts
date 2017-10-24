import { Engine } from "excalibur";

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