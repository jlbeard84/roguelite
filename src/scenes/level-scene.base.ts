import { Actor, Color, LockedCamera, Scene, TileMap, TileSprite } from "excalibur";

import { Game } from "../engine";
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

    protected initializeHero(game: Game) {
        
        this.add(this.hero);

        const camera = new LockedCamera();
        camera.setActorToFollow(this.hero);

        this.camera = camera;

        this.hero.resetTurn();
        
        this.hero.on(this.hero.turnEndedEventName ,() => {
            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].resetTurn();
            }
        });
    }

    protected activateEnemies() {

        for (let i = 0; i < this.enemies.length; i++) {
            this.enemies[i].hasActiveTurn = false;
            
            this.enemies[i].on(this.enemies[i].turnEndedEventName, () => {
                let anyActive: boolean = false;

                for (let i = 0; i < this.enemies.length; i++) {
                    if (this.enemies[i].hasActiveTurn) {
                        anyActive = true;
                        break;
                    }
                }

                if (!anyActive) {
                    this.hero.resetTurn();
                }
            });
        }
    }
}