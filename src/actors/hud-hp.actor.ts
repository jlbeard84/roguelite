import { HudActor } from "./hud-actor.actor";

import { SpriteFont } from "excalibur";
import { Game } from "../engine/game.engine";
import { LevelSceneBase } from "../scenes/level-scene.base";

export class HudHp extends HudActor {

    constructor(
        spriteFont: SpriteFont) {

        super(
            5,
            6,
            "HP:",
            spriteFont,
            2,
            2
        );
    }

    public update(game: Game, delta: number) {
        super.update(game, delta);

        let scene = game.currentScene as LevelSceneBase;

        if(scene && scene.hero) {
            this.text = `HP:${scene.hero.hitPoints}`;
        }
    }
}