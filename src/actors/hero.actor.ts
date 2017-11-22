import { Actor, CollisionType, Input } from "excalibur";

import { Game } from "../engine";
import { Direction } from "../enums";
import { CharacterIdleSpriteSheet } from "../spritesheets";
import { GameCharacterBase } from "./";

const startingHeroHitPoints: number = 10;

export class Hero extends GameCharacterBase {

    constructor() {
        super(startingHeroHitPoints);
    }

    public onInitialize(game: Game) {

        this.displayName = "Hero";

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

        let movementAmount: number = 16; //tileset size

        if (game.input.keyboard.wasPressed(Input.Keys.Up)) {
            this.setDrawing("idleUp");

            if(this.passesMapCollision(game, Direction.Up) && this.passesActorCollision(game, Direction.Up)) {
                this.y -= movementAmount;
                this.endTurn();
            }
        }
        
        if (game.input.keyboard.wasPressed(Input.Keys.Down)) {
            this.setDrawing("idleDown");
            
            if(this.passesMapCollision(game, Direction.Down) && this.passesActorCollision(game, Direction.Down)) {
                this.y += movementAmount;
                this.endTurn();
            }
        }

        if (game.input.keyboard.wasPressed(Input.Keys.Left)) {
            this.setDrawing("idleLeft");
            
            if(this.passesMapCollision(game, Direction.Left) && this.passesActorCollision(game, Direction.Left)) {
                this.x -= movementAmount;
                this.endTurn();
            }
        }

        if (game.input.keyboard.wasPressed(Input.Keys.Right)) {
            this.setDrawing("idleRight");
            
            if(this.passesMapCollision(game, Direction.Right) && this.passesActorCollision(game, Direction.Right)) {
                this.x += movementAmount;
                this.endTurn();
            }
        }

        this.movementDistance += movementAmount;

        //if (this.movementDistance > this.movementSpeed) {
        //    this.hasActiveTurn = false;
        //    this.emit(this.turnEndedEventName);
        //}
    }

    public resetTurn(): void {
        this.hasActiveTurn = true;
        this.movementDistance = 0;
    }

    endTurn(): void {
        this.hasActiveTurn = false;
        this.emit(this.turnEndedEventName);
    }
}