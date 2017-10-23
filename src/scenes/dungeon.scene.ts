import { Scene, Sprite } from "excalibur";

import { Game } from "../engine";
import { Resources } from "../resources";
import { CaveSpriteSheet } from "../spritesheets";

export class DungeonScene extends Scene {

    private resources: Resources;
    private caveSpriteSheet: CaveSpriteSheet;

    private map: Sprite[][] = [];

    constructor(
        context: CanvasRenderingContext2D,
        resources: Resources) {
        super();

        this.resources = resources;

        this.caveSpriteSheet = new CaveSpriteSheet(this.resources);
        this.loadMap();
        this.drawMap(context);
    }

    private drawMap(context: CanvasRenderingContext2D): void {
        const width: number = 16;
        const height: number = 16;

        console.log("Drawing map");

        for (let i = 0; i < this.map.length; i++) {
            for (let j = 0; j < this.map[0].length;) {
                this.map[i][j].draw(
                    context, 
                    i * width, 
                    j * height);
            }
        }
    }

    private loadMap(): void {
        
        console.log("Loading map");

        const mapRows: number = 35;
        const mapColumns: number = 50;
        
        for (let i = 0; i < mapRows; i++) {

            this.map.push(new Array<Sprite>());

            for (let j = 0; j < mapColumns; j++) {
                if (i == 0) {
                    if (j == 0) {
                        this.map[i].push(this.caveSpriteSheet.topLeftWall);
                    } else if(j == mapColumns - 1) {
                        this.map[i].push(this.caveSpriteSheet.topRightWall);
                    }

                    this.map[i].push(this.caveSpriteSheet.topWall);
                    continue;
                }

                if (i == mapRows - 1){ 
                    if (j == 0) {
                        this.map[i].push(this.caveSpriteSheet.bottomLeftWall);
                    } else if(j == mapColumns - 1) {
                        this.map[i].push(this.caveSpriteSheet.bottomRightWall);
                    }

                    this.map[i].push(this.caveSpriteSheet.bottomWall);
                    continue;
                }

                if (j == 0) {
                    this.map[i].push(this.caveSpriteSheet.leftWall);
                    continue;
                }

                if (j == mapColumns - 1) {
                    this.map[i].push(this.caveSpriteSheet.rightWall);
                    continue;
                }

                this.map[i].push(this.caveSpriteSheet.floor);
            }
        }
    }
}