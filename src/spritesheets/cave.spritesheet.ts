import { Sprite, SpriteSheet } from "excalibur";

import { Resources } from "../resources";

export class CaveSpriteSheet extends SpriteSheet {

    public topWall: Sprite;
    public bottomWall: Sprite;
    public leftWall: Sprite;
    public rightWall: Sprite;
    public topLeftWall: Sprite;
    public topRightWall: Sprite;
    public bottomLeftWall: Sprite;
    public bottomRightWall: Sprite;
    public floor: Sprite;

    public topWallIndex: number;
    public bottomWallIndex: number;
    public leftWallIndex: number;
    public rightWallIndex: number;
    public topLeftWallIndex: number;
    public topRightWallIndex: number;
    public bottomLeftWallIndex: number;
    public bottomRightWallIndex: number;
    public floorIndex: number;

    constructor(resources: Resources) {

        const resource = resources.CaveMapSheet;

        super(
            resource,
            16,
            10,
            16,
            16
        );

        this.topWallIndex = 108;
        this.bottomWallIndex = 76;
        this.leftWallIndex = 93;
        this.rightWallIndex = 91;
        this.topLeftWallIndex = 78;
        this.topRightWallIndex = 79;
        this.bottomLeftWallIndex = 94;
        this.bottomRightWallIndex = 95;
        this.floorIndex = 0;

        this.topWall = this.getSprite(this.topWallIndex);
        this.bottomWall = this.getSprite(this.bottomWallIndex);
        this.leftWall = this.getSprite(this.leftWallIndex);
        this.rightWall = this.getSprite(this.rightWallIndex);
        this.topLeftWall = this.getSprite(this.topLeftWallIndex);
        this.topRightWall = this.getSprite(this.topRightWallIndex);
        this.bottomLeftWall = this.getSprite(this.bottomLeftWallIndex);
        this.bottomRightWall = this.getSprite(this.bottomRightWallIndex);
        this.floor = this.getSprite(this.floorIndex);
    }
}