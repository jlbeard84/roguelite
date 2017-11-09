import { Label, SpriteFont, Vector, CollisionType } from "excalibur";

import { Game } from "../engine";
import { LevelSceneBase } from "../scenes/level-scene.base";

export class HudActor extends Label {
    private staticX: number;
    private staticY: number;
    private xMultiplier: number;
    private yMultiplier: number;
    private xScale: number = 4;
    private yScale: number = 4;

    constructor(
        xMultiplier: number,
        yMultiplier: number,        
        text: string,
        spriteFont: SpriteFont,
        xScale?: number,
        yScale?: number) {

        super(
            text,
            null,
            null,
            null,
            spriteFont
        );

        this.collisionType = CollisionType.PreventCollision;
        this.xMultiplier = xMultiplier;
        this.yMultiplier = yMultiplier;

        if(xScale) {
            this.xScale = xScale;
        }
        
        if(yScale) {
            this.yScale = yScale;
        }
        
        this.scale = new Vector(
            this.xScale, 
            this.yScale);
    }

    public update(game: Game, delta: number): void {

        super.update(game, delta);

        let scene = game.currentScene as LevelSceneBase;
        let newPos = scene.camera.getFocus().clone();

        //arbitrary values ¯\_(ツ)_/¯
        newPos.x -= (game.canvasWidth / this.xMultiplier);
        newPos.y -= (game.canvasHeight / this.yMultiplier);

        this.pos = newPos;
    }
}