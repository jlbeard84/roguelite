import { Actor, CollisionType, Input } from "excalibur";

import { Game } from "../engine";
import { Direction } from "../enums";
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

    public update(game: Game, delta: number) {

        if (game.input.keyboard.wasPressed(Input.Keys.Up)) {
            this.setDrawing("idleUp");

            if(this.passesMapCollision(game, Direction.Up)) {
                this.y -= this.movementSpeed;
            }
        }
        
        if (game.input.keyboard.wasPressed(Input.Keys.Down)) {
            this.setDrawing("idleDown");
            
            if(this.passesMapCollision(game, Direction.Down)) {
                this.y += this.movementSpeed;
            }
        }

        if (game.input.keyboard.wasPressed(Input.Keys.Left)) {
            this.setDrawing("idleLeft");
            
            if(this.passesMapCollision(game, Direction.Left)) {
                this.x -= this.movementSpeed;
            }
        }

        if (game.input.keyboard.wasPressed(Input.Keys.Right)) {
            this.setDrawing("idleRight");
            
            if(this.passesMapCollision(game, Direction.Right)) {
                this.x += this.movementSpeed;
            }
        }
    }

    private passesMapCollision(
        game: Game,
        direction: Direction): boolean {

        let xOffset: number = 0;
        let yOffset: number = 0;

        switch(direction) {
            case Direction.Up:
                yOffset = this.movementSpeed * -1;
                break;
            case Direction.Down:
                yOffset = this.movementSpeed;
                break 
            case Direction.Left:
                xOffset = this.movementSpeed * -1;
                break;
            case Direction.Right:
                xOffset = this.movementSpeed;
                break;
        }

        if (game.currentScene && game.currentScene.tileMaps && game.currentScene.tileMaps.length > 0) {
            let targetTileMap = game.currentScene.tileMaps[0];

            let targetCell = targetTileMap.getCellByPoint(this.x + xOffset, this.y + yOffset);

            if (!targetCell || targetCell.solid) {
                return false;
            }
        }
        
        return true;
    }
}