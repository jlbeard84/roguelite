import { Actor, CollisionType, Input } from "excalibur";

import { Game } from "../engine";
import { Direction } from "../enums";
import { CharacterIdleSpriteSheet } from "../spritesheets";
import { GameCharacterBase } from "./";

export class Hero extends GameCharacterBase {

    private movementDistance: number = 0;
    private movementSpeed: number = 16;
    private deltaModifier: number = 0.01;
    
    constructor() {
        super();
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

    public update(game: Game, delta: number): void {

        if (!this.hasActiveTurn) {
            return;
        }

        let movementAmount: number = 0;

        if (game.input.keyboard.wasPressed(Input.Keys.Up) || game.input.keyboard.isHeld(Input.Keys.Up)) {
            this.setDrawing("idleUp");

            if(this.passesMapCollision(game, Direction.Up)) {
                movementAmount = this.calcMovementAmount(delta);
                this.y -= movementAmount;
            }
        }
        
        if (game.input.keyboard.wasPressed(Input.Keys.Down) || game.input.keyboard.isHeld(Input.Keys.Down)) {
            this.setDrawing("idleDown");
            
            if(this.passesMapCollision(game, Direction.Down)) {
                movementAmount = this.calcMovementAmount(delta);
                this.y += movementAmount;
            }
        }

        if (game.input.keyboard.wasPressed(Input.Keys.Left) || game.input.keyboard.isHeld(Input.Keys.Left)) {
            this.setDrawing("idleLeft");
            
            if(this.passesMapCollision(game, Direction.Left)) {
                movementAmount = this.calcMovementAmount(delta);
                this.x -= movementAmount;
            }
        }

        if (game.input.keyboard.wasPressed(Input.Keys.Right) || game.input.keyboard.isHeld(Input.Keys.Right)) {
            this.setDrawing("idleRight");
            
            if(this.passesMapCollision(game, Direction.Right)) {
                movementAmount = this.calcMovementAmount(delta);
                this.x += movementAmount;
            }
        }

        this.movementDistance += movementAmount;

        if (this.movementDistance > this.movementSpeed) {
            this.hasActiveTurn = false;
            this.emit(this.turnEndedEventName);
        }
    }

    public resetTurn(): void {
        this.hasActiveTurn = true;
        this.movementDistance = 0;
    }

    private calcMovementAmount(delta: number): number {
        return this.movementSpeed * (delta * this.deltaModifier);
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