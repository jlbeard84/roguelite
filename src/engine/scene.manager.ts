import { Scene } from "excalibur";

import { Game } from "./game.engine";
import { RlLoader } from "./rl-loader.loader";
import { DungeonScene } from "../scenes";

export class SceneManager {
    
    public currentScene: Scene;

    private game: Game;
    private loader: RlLoader;

    constructor(
        game: Game,
        loader: RlLoader) {

        this.loader = loader;

        this.currentScene = new DungeonScene(
            game,
            this.loader.resources
        );

        game.add("DungeonScene", this.currentScene);
        game.goToScene("DungeonScene");
    }
}