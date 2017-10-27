import { Actor, Color, LockedCamera, TileMap, TileSprite } from "excalibur";

import { Creep, Hero } from "../actors";
import { Game } from "../engine";
import { Room } from "../entities";
import { CaveType } from "../enums";
import { Resources } from "../resources";
import { CaveRooms } from "../rooms";
import { CaveSpriteSheet } from "../spritesheets";
import { LevelSceneBase } from "./";

export class CaveScene extends LevelSceneBase {

    private roomWidth: number = 20;
    private roomHeight: number = 20;

    private mapRows: number = this.roomWidth * this.roomWidth;
    private mapColumns: number = this.roomHeight * this.roomHeight;
    private spriteWidth: number = 16;
    private spriteHeight: number = 16;
    private caveSpriteSheetName: string = "caveSpriteSheet";
    private mapName: string = "caveMap";

    private backgroundColor: Color = new Color(32, 23, 41);
    private caveSpriteSheet: CaveSpriteSheet;
    private enemies: Creep[] = [];
    private caveRooms: Room<CaveType>[][] = [];

    private tileMap: TileMap;

    constructor(hero: Hero) {

        super(
            "CaveScene",
            hero);
    }

    public onInitialize(game: Game) {

        this.add(this.hero);

        for (let i = 0; i < 4; i ++) {
            const enemy = new Creep();
            enemy.hasActiveTurn = false;

            enemy.on(enemy.turnEndedEventName, () => {
                let anyActive: boolean = false;

                for (let i = 0; i < this.enemies.length; i++) {
                    if (this.enemies[i].hasActiveTurn) {
                        anyActive = true;
                        break;
                    }
                }

                if (!anyActive) {
                    this.hero.resetTurn();
                }
            });

            this.enemies.push(enemy);
            this.add(enemy);
        }

        const camera = new LockedCamera();
        camera.setActorToFollow(this.hero);

        this.camera = camera;

        const resources = game.loader.resources;

        this.caveSpriteSheet = new CaveSpriteSheet(resources);
        
        game.backgroundColor = this.backgroundColor;

        this.caveRooms = this.generateRooms();

        this.tileMap = this.generateTileMap(game);
        this.add(this.tileMap)

        this.randomizeStartingPosition();

        this.hero.resetTurn();

        this.hero.on(this.hero.turnEndedEventName ,() => {
            for (let i = 0; i < this.enemies.length; i++) {
                this.enemies[i].resetTurn();
            }
        });
    }

    private generateRooms(): Room<CaveType>[][] {
        
        const rooms: Room<CaveType>[][] = [];
        
        for (let i = 0; i < this.roomWidth; i++) {

            let row: Room<CaveType>[] = [];

            for (let j = 0; j < this.roomHeight; j++) {
                //TODO: make this code smarter once we have more room types defined
                row.push(CaveRooms.Rooms[0]);
            }

            rooms.push(row);
        }

        return rooms;
    }

    private generateTileMap(game: Game): TileMap {

        let x = game.canvasWidth / 2 * -1;
        let y = game.canvasHeight / 2 * -1;

        const tileMap = new TileMap(
            x, 
            y, 
            this.spriteWidth, 
            this.spriteHeight, 
            this.mapRows, 
            this.mapColumns);

        tileMap.registerSpriteSheet(
            this.caveSpriteSheetName,
            this.caveSpriteSheet);

        for (let roomRow = 0; roomRow < this.caveRooms.length; roomRow++) {
            for (let roomCol = 0; roomCol < this.caveRooms[roomRow].length; roomCol++) {
                for (let tileRow = 0; tileRow < this.caveRooms[roomRow][roomCol].indexArray.length; tileRow++) {
                    for (let tileCol = 0; tileCol < this.caveRooms[roomRow][roomCol].indexArray[tileRow].length; tileCol++) {
                        let cellIndex = tileCol + (tileRow * this.mapColumns) + (this.roomWidth * roomCol) + (Math.pow(this.roomHeight, 3) * roomRow);

                        let tileType = this.caveRooms[roomRow][roomCol].indexArray[tileRow][tileCol]

                        if (roomRow == 0 && tileRow == 0 && tileType == CaveType.Floor) {
                            tileType = CaveType.TopWall;
                        } else if (roomRow == this.caveRooms.length - 1 && tileRow == this.roomHeight - 1 && tileType == CaveType.Floor) {
                            tileType = CaveType.BottomWall;
                        } else  if (roomCol == 0 && tileCol == 0 && tileType == CaveType.Floor) {
                            tileType = CaveType.LeftWall;
                        } else if (roomCol == this.caveRooms[roomRow].length - 1 && tileCol == this.roomWidth - 1 && tileType == CaveType.Floor) {
                            tileType = CaveType.RightWall;
                        }

                        tileMap.getCellByIndex(cellIndex).pushSprite(new TileSprite(
                            this.caveSpriteSheetName, 
                            tileType));

                        tileMap.getCellByIndex(cellIndex).solid = tileType == CaveType.Floor 
                            ? false
                            : true;
                    }
                }
            }
        }

        return tileMap;
    }

    private randomizeStartingPosition(): void {
        //TODO:
    }
}