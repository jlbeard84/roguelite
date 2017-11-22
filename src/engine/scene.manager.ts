import { Scene } from "excalibur";

import { Hero } from "../actors";
import { Game } from "./game.engine";
import { RlLoader } from "./rl-loader.loader";
import { CaveScene } from "../scenes";

export class SceneManager {
    
    public currentScene: Scene;

    private game: Game;
    private loader: RlLoader;
    private hero: Hero;

    constructor(
        game: Game,
        loader: RlLoader) {

        this.loader = loader;

        this.hero = new Hero();

        this.currentScene = new CaveScene(this.hero);

        game.add("CaveScene", this.currentScene);
        game.goToScene("CaveScene");
        game.currentScene.camera.zoom(2);
    }
}