import { Actor, CollisionType, Input } from "excalibur";

import { Game } from "../engine";
import { Direction } from "../enums";
import { CreepSpriteSheet } from "../spritesheets";

export class Creep extends Actor {

    public hasActiveTurn: boolean;
    public turnEndedEventName = "turnEnded";

    private movementDistance: number = 0;
    private movementSpeed: number = 16;
    private deltaModifier: number = 0.01;
    
    constructor() {
        super();

        this.collisionType = CollisionType.Active;
    }

    public onInitialize(game: Game) {

        const resources = game.loader.resources;

        const characterSheet = new CreepSpriteSheet(
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

        const movementVector = Math.floor(Math.random() * 4) + 1;

        if (movementVector == Direction.Up) {
            this.setDrawing("idleUp");

            if(this.passesMapCollision(game, Direction.Up)) {
                movementAmount = this.calcMovementAmount(delta);
                this.y -= movementAmount;
            }
        } 
        
        if (movementVector == Direction.Down) {
            this.setDrawing("idleDown");
            
            if(this.passesMapCollision(game, Direction.Down)) {
                movementAmount = this.calcMovementAmount(delta);
                this.y += movementAmount;
            }
        } 
        
        if (movementVector == Direction.Left) {
            this.setDrawing("idleLeft");
            
            if(this.passesMapCollision(game, Direction.Left)) {
                movementAmount = this.calcMovementAmount(delta);
                this.x -= movementAmount;
            }
        } 
        
        if (movementVector == Direction.Right) {
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