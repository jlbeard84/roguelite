import { Color, LockedCamera, Scene, TileMap, TileSprite } from "excalibur";

import { Hero } from "../actors";
import { Game } from "../engine";
import { Room } from "../entities";
import { CaveType } from "../enums";
import { Resources } from "../resources";
import { CaveRooms } from "../rooms";
import { CaveSpriteSheet } from "../spritesheets";

export class DungeonScene extends Scene {

    public sceneName: string = "DungeonScene";

    //room size is 10x10 as well
    private roomWidth: number = 10;
    private roomHeight: number = 10;

    private mapRows: number = this.roomWidth * 10;
    private mapColumns: number = this.roomHeight * 10;
    private spriteWidth: number = 16;
    private spriteHeight: number = 16;
    private caveSpriteSheetName: string = "caveSpriteSheet";
    private mapName: string = "caveMap";

    private backgroundColor: Color = new Color(32, 23, 41);
    private caveSpriteSheet: CaveSpriteSheet;
    private hero: Hero;
    private caveRooms: Room<CaveType>[][] = [];

    private tileMap: TileMap;

    constructor(hero: Hero) {
        super();

        this.hero = hero;
    }

    public onInitialize(game: Game) {

        console.log(this.hero);

        this.add(this.hero);

        const camera = new LockedCamera();
        camera.setActorToFollow(this.hero);

        this.camera = camera;

        const resources = game.loader.resources;

        this.caveSpriteSheet = new CaveSpriteSheet(resources);
        
        game.backgroundColor = this.backgroundColor;

        console.log("Loading map");

        let x = game.canvasWidth / 2 * -1;
        let y = game.canvasHeight / 2 * -1;

        this.caveRooms = this.generateRooms();

        this.tileMap = new TileMap(
            x, 
            y, 
            this.spriteWidth, 
            this.spriteHeight, 
            this.mapRows, 
            this.mapColumns);

        this.tileMap.registerSpriteSheet(
            this.caveSpriteSheetName,
            this.caveSpriteSheet);

        // for (let i = 0; i < this.mapRows; i++) {

        //     for( let j = 0; j < this.mapColumns; j++) {

        //         let tileSprite: TileSprite;

        //         if (i == 0) {
        //             if (j == 0) {
        //                 tileSprite = new TileSprite(
        //                     this.caveSpriteSheetName,
        //                     CaveType.TopLeftWall);
        //             } else if(j == this.mapColumns - 1) {
        //                 tileSprite = new TileSprite(
        //                     this.caveSpriteSheetName,
        //                     CaveType.TopRightWall);
        //             } else {
        //                 tileSprite = new TileSprite(
        //                     this.caveSpriteSheetName,
        //                     CaveType.TopWall);
        //             }
        //         }
        //         else if (i == this.mapRows - 1){ 
        //             if (j == 0) {
        //                 tileSprite = new TileSprite(
        //                     this.caveSpriteSheetName,
        //                     CaveType.BottomLeftWall);
        //             } else if(j == this.mapColumns - 1) {
        //                 tileSprite = new TileSprite(
        //                     this.caveSpriteSheetName,
        //                     CaveType.BottomRightWall);
        //             } else {
        //                 tileSprite = new TileSprite(
        //                     this.caveSpriteSheetName,
        //                     CaveType.BottomWall);
        //             }
        //         }
        //         else if (j == 0) {
        //             tileSprite = new TileSprite(
        //                 this.caveSpriteSheetName,
        //                 CaveType.LeftWall);
        //         }
        //         else if (j == this.mapColumns - 1) {
        //             tileSprite = new TileSprite(
        //                 this.caveSpriteSheetName,
        //                 CaveType.RightWall);
        //         } else {
        //             tileSprite = new TileSprite(
        //                 this.caveSpriteSheetName,
        //                 CaveType.Floor);
        //         }

        //         let cellIndex = j + (i * this.mapColumns);

        //         this.tileMap.getCellByIndex(cellIndex).pushSprite(tileSprite);
        //     }
        //}

        for (let roomRow = 0; roomRow < this.caveRooms.length; roomRow++) {
            for (let roomCol = 0; roomCol < this.caveRooms[roomRow].length; roomCol++) {
                for (let tileRow = 0; tileRow < this.caveRooms[roomRow][roomCol].indexArray.length; tileRow++) {
                    for (let tileCol = 0; tileCol < this.caveRooms[roomRow][roomCol].indexArray[tileRow].length; tileCol++) {
                        let cellIndex = tileCol + (tileRow * this.mapColumns) + (this.roomWidth * roomCol) + (Math.pow(this.roomHeight, 3) * roomRow);

                        this.tileMap.getCellByIndex(cellIndex).pushSprite(new TileSprite(
                            this.caveSpriteSheetName, 
                            this.caveRooms[roomRow][roomCol].indexArray[tileRow][tileCol]));
                    }
                }
            }
        }

        this.add(this.tileMap)

        console.log("Dungeon scene", this);
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
}