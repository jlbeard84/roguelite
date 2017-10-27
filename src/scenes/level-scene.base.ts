import { Actor, Color, LockedCamera, Scene, TileMap, TileSprite } from "excalibur";

import { Hero, GameCharacterBase } from "../actors";

export abstract class LevelSceneBase extends Scene {
    public sceneName: string;
    public hero: Hero;
    public enemies: GameCharacterBase[] = [];

    constructor(sceneName: string, hero: Hero) {
        super();

        this.sceneName = sceneName;
        this.hero = hero;
    }
}