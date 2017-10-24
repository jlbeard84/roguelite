import { Actor, CollisionType, Input } from "excalibur";

import { Game } from "../engine";
import { CharacterIdleSpriteSheet } from "../spritesheets";

export class Hero extends Actor {

    private movementSpeed = 16;

    constructor() {
        super();

        this.collisionType = CollisionType.Active;
    }

    public onInitialize(game: Game) {

        const resources = game.loader.resources;

        const characterSheet = new CharacterIdleSpriteSheet(
            resources);

        const idleDownAnimation = characterSheet.getAnimationByIndices(
            game, 
            characterSheet.getIdleDownIndices(),
            240);

        const idleRightAnimation = characterSheet.getAnimationByIndices(
            game, 
            characterSheet.getIdleRightIndices(),
            240);

        const idleUpAnimation = characterSheet.getAnimationByIndices(
            game, 
            characterSheet.getIdleUpIndices(),
            240);

        const idleLeftAnimation = characterSheet.getAnimationByIndices(
            game, 
            characterSheet.getIdleLeftIndices(),
            240);

        this.addDrawing("idleDown", idleDownAnimation);
        this.addDrawing("idleRight", idleRightAnimation);
        this.addDrawing("idleUp", idleUpAnimation);
        this.addDrawing("idleLeft", idleLeftAnimation);

        this.setDrawing("idleDown");
    }

    public update(game: Game) {

        if (game.input.keyboard.wasPressed(Input.Keys.Up)) {
            this.y -= this.movementSpeed;
            this.setDrawing("idleUp");
        }
        
        if (game.input.keyboard.wasPressed(Input.Keys.Down)) {
            this.y += this.movementSpeed;
            this.setDrawing("idleDown");
        }

        if (game.input.keyboard.wasPressed(Input.Keys.Left)) {
            this.x -= this.movementSpeed;
            this.setDrawing("idleLeft");
        }

        if (game.input.keyboard.wasPressed(Input.Keys.Right)) {
            this.x += this.movementSpeed;
            this.setDrawing("idleRight");
        }
    }
}