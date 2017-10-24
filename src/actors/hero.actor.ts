import { Actor } from "excalibur";

import { Game } from "../engine";
import { CharacterIdleSpriteSheet } from "../spritesheets";

export class Hero extends Actor {

    constructor() {
        super();
    }

    public onInitialize(game: Game) {

        const resources = game.loader.resources;

        const idleSheet = new CharacterIdleSpriteSheet(
            resources);

        const idleAnimation = idleSheet.getAnimationForAll(
            game, 
            240);

        this.addDrawing("idle", idleAnimation);
    }
}