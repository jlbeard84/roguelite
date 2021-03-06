import { Actor, CollisionType, Input, Animation } from "excalibur";

import { Game, InputManager } from "../engine";
import { Direction } from "../enums";
import { CharacterAttackSpriteSheet, CharacterIdleSpriteSheet } from "../spritesheets";
import { GameCharacterBase } from "./";

const startingHeroHitPoints: number = 10;
var playerInput : InputManager;
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
        playerInput = new InputManager();
        game.add(playerInput);

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

        if (playerInput.upPressed) {
            this.setDrawing("idleUp");
            this.directionFacing = Direction.Up;

            if(!playerInput.turnPressed && this.passesMapCollision(game, Direction.Up) && this.passesActorCollision(game, Direction.Up)) {
                this.y -= movementAmount;
                this.endTurn();
            }
        }
        
        if (playerInput.downPressed) {
            this.setDrawing("idleDown");
            this.directionFacing = Direction.Down;
            
            if(!playerInput.turnPressed && this.passesMapCollision(game, Direction.Down) && this.passesActorCollision(game, Direction.Down)) {
                this.y += movementAmount;
                this.endTurn();
            }
        }

        if (playerInput.leftPressed) {
            this.setDrawing("idleLeft");
            this.directionFacing = Direction.Left;
            
            if(!playerInput.turnPressed && this.passesMapCollision(game, Direction.Left) && this.passesActorCollision(game, Direction.Left)) {
                this.x -= movementAmount;
                this.endTurn();
            }
        }

        if (playerInput.rightPressed) {
            this.setDrawing("idleRight");
            this.directionFacing = Direction.Right;
            
            if(!playerInput.turnPressed && this.passesMapCollision(game, Direction.Right) && this.passesActorCollision(game, Direction.Right)) {
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

            //do collision logic here
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