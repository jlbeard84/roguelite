import { Actor, CollisionType, Input, Ray, Vector, Cell, SpriteSheet } from "excalibur";

import { Hero } from "./"
import { Game } from "../engine";
import { Direction } from "../enums";

export abstract class GameCharacterBase extends Actor {

    public hasActiveTurn: boolean;
    public turnEndedEventName: string = "turnEnded";
    
    public adjacentToHero: boolean = false;

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
        
        let xOffset : number = 0;
        let yOffset : number = 0;
        
        /*Commented text here is for examining tile-based collision. Not working for some rason, probably bizarre sprite sizes*/
        //let targetTileMap = game.currentScene.tileMaps[0];
        //var targetCell;
        //let targetCell = targetTileMap.getCellByPoint(this.x + xOffset, this.y + yOffset);
        
        var notBlocked : boolean = true;

        game.currentScene.actors.forEach(ele => {
            if(this != ele){
            switch(direction) {
                case Direction.Up: //
                    yOffset = -16;
                    xOffset = 0;
                    //targetCell = targetTileMap.getCellByPoint(this.x + xOffset, this.y + yOffset);
                    //if(targetCell.getBounds().contains(ele.pos) && targetCell){
                    //    console.log(ele);
                    if(this.pos.x == ele.pos.x && this.pos.y + yOffset == ele.pos.y){
                        if(ele instanceof Hero){
                            this.adjacentToHero = true;
                        }
                        notBlocked = false;
                    }
                    break;
                case Direction.Down:
                    yOffset = 16;
                    xOffset = 0;
                    //targetCell = targetTileMap.getCellByPoint(this.x + xOffset, this.y + yOffset);
                    //if(targetCell.getBounds().contains(ele.pos) && targetCell){
                    //    console.log(ele);
                    if(this.pos.x == ele.pos.x && this.pos.y + yOffset == ele.pos.y){
                        if(ele instanceof Hero){
                            this.adjacentToHero = true;
                        }
                        notBlocked = false;
                    }
                    break;
                case Direction.Left:
                    xOffset = -16;
                    yOffset = 0;
                    //targetCell = targetTileMap.getCellByPoint(this.x + xOffset, this.y + yOffset);
                    //if(targetCell.getBounds().contains(ele.pos)){
                    //    console.log(ele);
                    if(this.pos.x + xOffset == ele.pos.x && this.pos.y == ele.pos.y){
                        if(ele instanceof Hero){
                            this.adjacentToHero = true;
                        }
                        notBlocked = false;
                    }
                    break;
                case Direction.Right:
                    xOffset = 16;
                    yOffset = 0;
                    //targetCell = targetTileMap.getCellByPoint(this.x + xOffset, this.y + yOffset);
                    //if(targetCell.getBounds().contains(ele.pos)){
                    //    console.log(ele);
                    if(this.pos.x + xOffset == ele.pos.x && this.pos.y == ele.pos.y){
                        if(ele instanceof Hero){
                            this.adjacentToHero = true;
                        }
                        notBlocked = false;
                    }
                    break;
                 case Direction.UpLeft:
                    xOffset = -16;
                    yOffset = -16;
                    if(this.pos.x + xOffset == ele.pos.x && this.pos.y + yOffset == ele.pos.y){
                        if(ele instanceof Hero){
                            this.adjacentToHero = true;
                        }
                        notBlocked = false;
                    }
                    break;
                case Direction.UpRight:
                    xOffset = 16;
                    yOffset = -16;
                    if(this.pos.x + xOffset == ele.pos.x && this.pos.y + yOffset == ele.pos.y){
                        if(ele instanceof Hero){
                            this.adjacentToHero = true;
                        }
                        notBlocked = false;
                    }
                    break;
                case Direction.DownLeft:
                    xOffset = -16;
                    yOffset = 16;
                    if(this.pos.x + xOffset == ele.pos.x && this.pos.y + yOffset == ele.pos.y){
                        if(ele instanceof Hero){
                            this.adjacentToHero = true;
                        }
                        notBlocked = false;
                    }
                    break;
                case Direction.DownRight:
                    xOffset = 16;
                    yOffset = 16;
                    if(this.pos.x + xOffset == ele.pos.x && this.pos.y + yOffset == ele.pos.y){
                        if(ele instanceof Hero){
                            this.adjacentToHero = true;
                        }
                        notBlocked = false;
                    }
                    break; 
            }
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