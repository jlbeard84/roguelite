import { Actor, CollisionType, Input } from "excalibur";

import { Game } from "../engine";
import { Direction } from "../enums";

export abstract class GameCharacterBase extends Actor {

    public hasActiveTurn: boolean;
    public turnEndedEventName: string = "turnEnded";
    
    public hitPoints: number;
    public maxHitPoints: number;

    protected movementDistance: number = 0;
    protected movementSpeed: number = 16;
    protected deltaModifier: number = 0.01;

    constructor(maxHitPoints?: number) {
        super();

        if(maxHitPoints) {
            this.maxHitPoints = maxHitPoints;
            this.hitPoints = maxHitPoints;
        }

        this.collisionType = CollisionType.Active;
    }

    public resetTurn(): void {
        this.hasActiveTurn = true;
        this.movementDistance = 0;
    }

    protected  calcMovementAmount(delta: number): number {
        return this.movementSpeed * (delta * this.deltaModifier);
    }

    protected passesMapCollision(
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