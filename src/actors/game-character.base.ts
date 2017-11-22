import { Actor, CollisionType, Input, Ray, Vector, Cell } from "excalibur";

import { Hero } from "./"
import { Game } from "../engine";
import { Direction } from "../enums";

export abstract class GameCharacterBase extends Actor {

    public hasActiveTurn: boolean;
    public turnEndedEventName: string = "turnEnded";
    
    public displayName: string = "";
    public hitPoints: number;
    public maxHitPoints: number;

    protected movementDistance: number = 0;
    protected movementSpeed: number = 16;
    protected deltaModifier: number = 0.01;

    public lastTile: Cell;

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

    protected passesActorCollision(
        game: Game,
        direction: Direction): boolean {
        
        var notBlocked : boolean = true;

        game.currentScene.actors.forEach(ele => {
            switch(direction) {
                case Direction.Up:
                    if(this.pos.y - 16 == ele.pos.y && this.pos.x == ele.pos.x){
                       notBlocked = false;
                    }
                    break;
                case Direction.Down:
                    if(this.pos.y + 16 == ele.pos.y && this.pos.x == ele.pos.x){
                       notBlocked = false;
                    }
                    break;
                case Direction.Left:
                    if(this.pos.x - 16 == ele.pos.x && this.pos.y == ele.pos.y){
                        notBlocked = false;
                    }
                    break;
                case Direction.Right:
                    if(this.pos.x + 16 == ele.pos.x && this.pos.y == ele.pos.y){
                        notBlocked = false;
                    }
                    break;
            }
        });

        return notBlocked;
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

            //let lastTile = targetTileMap.getCellByPoint(this.x, this.y);

            if (!targetCell || targetCell.solid) {
                return false;
            }
        }
        
        return true;
    }
}