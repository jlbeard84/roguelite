import { Actor, CollisionType, Input } from "excalibur";

import { Game } from "../engine";
import { Direction } from "../enums";
import { CreepSpriteSheet } from "../spritesheets";
import { GameCharacterBase } from "./";
import { LevelSceneBase } from "../scenes";
import { Hero } from "./";

export class Creep extends GameCharacterBase {

    private lowHitPointRange = 4;
    private highHitPointRange = 5;

    private chaseDistance: number = 640;
    private idleTurnThreshold: number = 0;
    private idleTurns: number = 0;

    constructor() {
        super();

        const hp = Math.floor(Math.random() * (this.highHitPointRange - this.lowHitPointRange)) + this.lowHitPointRange;

        this.maxHitPoints = hp;
        this.hitPoints = hp;
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

        const currentScene = game.currentScene as LevelSceneBase;

        if (!currentScene || !currentScene.hero) {
            return;
        }

        const hero = currentScene.hero;

        if(this.adjacentToHero){
            this.hasActiveTurn = false;
            this.idleTurns = 0;
            this.emit(this.turnEndedEventName);
            this.adjacentToHero = false;

            let faceDirection = this.determineMovementDirection(
                hero);

            this.setDirectionAnimation(faceDirection);

            return;
        }

        const impassibleDirections: Direction[] = []
        
        for (let i = 1; i < 9; i++) {
            if (!this.passesMapCollision(game, i)) {
                impassibleDirections.push(i);
            }
            if (!this.passesActorCollision(game, i)){
                impassibleDirections.push(i);
            }
        }
        
        const movementDirection: Direction = this.determineMovementDirection(
            hero, 
            impassibleDirections);
        
        if(movementDirection == null){
            this.hasActiveTurn = false;
            this.idleTurns = 0;
            this.emit(this.turnEndedEventName);
            return;
        }

        let movementAmount: number = 16;

        this.setDirectionAnimation(movementDirection);

        if (movementDirection == Direction.Up) {
            if (impassibleDirections.indexOf(Direction.Up) == -1) {
                this.y -= movementAmount;
            }
        } 
        
        if (movementDirection == Direction.Down) {
            if (impassibleDirections.indexOf(Direction.Down) == -1) {
                this.y += movementAmount;
            }
        } 
        
        if (movementDirection == Direction.Left) {
            if (impassibleDirections.indexOf(Direction.Left) == -1) {
                this.x -= movementAmount;
            }
        } 
        
        if (movementDirection == Direction.Right) {
            if (impassibleDirections.indexOf(Direction.Right) == -1) {
                this.x += movementAmount;
            }
        }

        this.movementDistance = movementAmount;
        
        this.idleTurns++;

        if (this.movementDistance >= this.movementSpeed || this.idleTurns >= this.idleTurnThreshold) {
            this.hasActiveTurn = false;
            this.idleTurns = 0;
            this.emit(this.turnEndedEventName);
        }
    }

    public determineMovementDirection(
        hero: Hero,
        impassibleDirections?: Direction[]): Direction {

        if (!impassibleDirections) {
            impassibleDirections = [];
        }

        let possibleDirections: Direction[] = [];

        const xDistance = this.x - hero.x;
        const yDistance = this.y - hero.y;

        const absXDistance = Math.abs(xDistance);
        const absYDistance = Math.abs(yDistance);

        if (absYDistance >= absXDistance) {
            if (yDistance >= this.chaseDistance * -1 || yDistance <= this.chaseDistance) {
                if (yDistance >= 0 && impassibleDirections.indexOf(Direction.Up) == -1) {
                    return Direction.Up;
                }

                if (impassibleDirections.indexOf(Direction.Down) == -1) {
                    return Direction.Down;
                }
            }
            
            if (xDistance >= this.chaseDistance * -1 || xDistance <= this.chaseDistance) {
                if (xDistance >= 0 && impassibleDirections.indexOf(Direction.Left) == -1)  {
                    return Direction.Left;
                }

                if (impassibleDirections.indexOf(Direction.Right) == -1) {
                    return Direction.Right;
                }
            }  
        } 
        
        if (absXDistance >= absYDistance) {
            if((xDistance >= this.chaseDistance * -1 || xDistance <= this.chaseDistance)) {
                if (xDistance >= 0 && impassibleDirections.indexOf(Direction.Left) == -1) {
                    return Direction.Left;
                }

                if (impassibleDirections.indexOf(Direction.Right) == -1) {
                    return Direction.Right;
                }
            } 
            
            if (yDistance >= this.chaseDistance * -1 || yDistance <= this.chaseDistance) {
                
                if (yDistance >= 0 && impassibleDirections.indexOf(Direction.Up) == -1) {
                    return Direction.Up;
                }
    
                if (impassibleDirections.indexOf(Direction.Down) == -1) {
                    return Direction.Down;
                }
            }
        } 

        return null;
        //return Math.floor(Math.random() * 4) + 1;
    }

    public setDirectionAnimation(direction: Direction) {
        if (direction == Direction.Up) {
            this.setDrawing("idleUp");
            return;
        } 
        
        if (direction == Direction.Down) {
            this.setDrawing("idleDown");
            return;
        } 
        
        if (direction == Direction.Left) {
            this.setDrawing("idleLeft");
            return;
        } 
        
        if (direction == Direction.Right) {
            this.setDrawing("idleRight");
            return;
        }
    }
}