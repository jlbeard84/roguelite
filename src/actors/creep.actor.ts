import { Actor, CollisionType, Input } from "excalibur";

import { Game } from "../engine";
import { Direction } from "../enums";
import { CreepSpriteSheet } from "../spritesheets";
import { GameCharacterBase } from "./";

export class Creep extends GameCharacterBase {

    constructor() {
        super();
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
}