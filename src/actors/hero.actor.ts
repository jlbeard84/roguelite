import { Actor, CollisionType, Input, Animation } from "excalibur";

import { Game } from "../engine";
import { Direction } from "../enums";
import { CharacterAttackSpriteSheet, CharacterIdleSpriteSheet } from "../spritesheets";
import { GameCharacterBase } from "./";
import { LevelSceneBase } from "../scenes/level-scene.base";

const startingHeroHitPoints: number = 10;
const idleAnimationSpeed: number = 240;
const attackAnimationSpeed: number = 100;

export class Hero extends GameCharacterBase {

    public directionFacing: Direction;
    public isAttacking: boolean = false;

    private attackDownAnimation: Animation;
    private attackRightAnimation: Animation;
    private attackUpAnimation: Animation;
    private attackLeftAnimation: Animation;

    constructor() {
        super(startingHeroHitPoints);
    }

    public onInitialize(game: Game) {

        this.displayName = "Hero";

        const resources = game.loader.resources;

        const characterSheet = new CharacterIdleSpriteSheet(
            resources);

        const attackSheet = new CharacterAttackSpriteSheet(
            resources)

        const idleDownAnimation = characterSheet.getAnimationByIndices(
            game, 
            characterSheet.getIdleDownIndices(),
            idleAnimationSpeed);

        const idleRightAnimation = characterSheet.getAnimationByIndices(
            game, 
            characterSheet.getIdleRightIndices(),
            idleAnimationSpeed);

        const idleUpAnimation = characterSheet.getAnimationByIndices(
            game, 
            characterSheet.getIdleUpIndices(),
            idleAnimationSpeed);

        const idleLeftAnimation = characterSheet.getAnimationByIndices(
            game, 
            characterSheet.getIdleLeftIndices(),
            idleAnimationSpeed);

        this.attackDownAnimation = attackSheet.getAnimationByIndices(
            game,
            attackSheet.getDownIndices(),
            attackAnimationSpeed);

        this.attackRightAnimation = attackSheet.getAnimationByIndices(
            game,
            attackSheet.getRightIndices(),
            attackAnimationSpeed);

        this.attackUpAnimation = attackSheet.getAnimationByIndices(
            game,
            attackSheet.getUpIndices(),
            attackAnimationSpeed);

        this.attackLeftAnimation = attackSheet.getAnimationByIndices(
            game,
            attackSheet.getLeftIndices(),
            attackAnimationSpeed);

        this.attackDownAnimation.loop = false;
        this.attackLeftAnimation.loop = false;
        this.attackUpAnimation.loop = false;
        this.attackRightAnimation.loop = false;

        this.addDrawing("idleDown", idleDownAnimation);
        this.addDrawing("idleRight", idleRightAnimation);
        this.addDrawing("idleUp", idleUpAnimation);
        this.addDrawing("idleLeft", idleLeftAnimation);

        this.addDrawing("attackDown", this.attackDownAnimation);
        this.addDrawing("attackRight", this.attackRightAnimation);
        this.addDrawing("attackUp", this.attackUpAnimation);
        this.addDrawing("attackLeft", this.attackLeftAnimation);

        this.setDrawing("idleDown");
        this.directionFacing = Direction.Down;
    }

    public update(game: Game, delta: number): void {

        if (this.isAttacking) {
            if (this.directionFacing == Direction.Down && this.attackDownAnimation.isDone()) {
                this.setDrawing("idleDown");
                this.isAttacking = false;
            } else if (this.directionFacing == Direction.Right && this.attackRightAnimation.isDone()) {
                this.setDrawing("idleRight");
                this.isAttacking = false;
            } else if (this.directionFacing == Direction.Up && this.attackUpAnimation.isDone()) {
                this.setDrawing("idleUp");
                this.isAttacking = false;
            } else if (this.directionFacing == Direction.Left && this.attackLeftAnimation.isDone()) {
                this.setDrawing("idleLeft");
                this.isAttacking = false;
            }   
        }

        if (!this.hasActiveTurn) {
            return;
        }

        let movementAmount: number = 16; //tileset size

        if (game.input.keyboard.wasPressed(Input.Keys.Up)) {
            this.setDrawing("idleUp");
            this.directionFacing = Direction.Up;

            if(this.passesMapCollision(game, Direction.Up) && this.passesActorCollision(game, Direction.Up)) {
                this.y -= movementAmount;
                this.endTurn();
            }
        }
        
        if (game.input.keyboard.wasPressed(Input.Keys.Down)) {
            this.setDrawing("idleDown");
            this.directionFacing = Direction.Down;
            
            if(this.passesMapCollision(game, Direction.Down) && this.passesActorCollision(game, Direction.Down)) {
                this.y += movementAmount;
                this.endTurn();
            }
        }

        if (game.input.keyboard.wasPressed(Input.Keys.Left)) {
            this.setDrawing("idleLeft");
            this.directionFacing = Direction.Left;
            
            if(this.passesMapCollision(game, Direction.Left) && this.passesActorCollision(game, Direction.Left)) {
                this.x -= movementAmount;
                this.endTurn();
            }
        }

        if (game.input.keyboard.wasPressed(Input.Keys.Right)) {
            this.setDrawing("idleRight");
            this.directionFacing = Direction.Right;
            
            if(this.passesMapCollision(game, Direction.Right) && this.passesActorCollision(game, Direction.Right)) {
                this.x += movementAmount;
                this.endTurn();
            }
        }

        if (game.input.keyboard.wasPressed(Input.Keys.Space)) {
            
            switch(this.directionFacing) {
                case Direction.Down:
                    this.setDrawing("attackDown");
                    break;
                case Direction.Right:
                    this.setDrawing("attackRight");
                    break;
                case Direction.Up:
                    this.setDrawing("attackUp");
                    break;
                case Direction.Left:
                    this.setDrawing("attackLeft");
                    break;
            }

            this.isAttacking = true;

            //TODO: get this from equipped weapon
            const attackRange = 4;
            const attackDamage = 5;

            if (game.currentScene instanceof LevelSceneBase) {

                console.log("Checking collisions");

                const enemies = game.currentScene.enemies;

                for (let i = 0; i < enemies.length; i++) {

                    let enemyRange: number = 0;

                    //fix this calc
                    if (this.directionFacing == Direction.Down) {
                        //enemyRange = enemies[i].y - this.y
                    } else if (this.directionFacing == Direction.Right) {
                        //enemyRange = this.y - enemies[i].y;
                    } else if (this.directionFacing == Direction.Up) {
                        //enemyRange = this.y - enemies[i].y;
                    } else if (this.directionFacing == Direction.Left) {
                        //enemyRange = enemies[i].x - this.x;
                    }

                    if (enemyRange > 0 && enemyRange <= attackRange) {
                        console.log(enemies[i], "Taking Damage");
                        enemies[i].takeDamage(attackDamage);
                    }
                }
            }

            this.endTurn();
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