import { Sprite, SpriteSheet } from "excalibur";

import { CaveType } from "../enums";
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

    constructor(resources: Resources) {

        const resource = resources.CaveMapSheet;

        super(
            resource,
            16,
            10,
            16,
            16
        );

        this.topWall = this.getSprite(CaveType.TopWall);
        this.bottomWall = this.getSprite(CaveType.BottomWall);
        this.leftWall = this.getSprite(CaveType.LeftWall);
        this.rightWall = this.getSprite(CaveType.RightWall);
        this.topLeftWall = this.getSprite(CaveType.TopLeftWall);
        this.topRightWall = this.getSprite(CaveType.TopRightWall);
        this.bottomLeftWall = this.getSprite(CaveType.BottomLeftWall);
        this.bottomRightWall = this.getSprite(CaveType.BottomRightWall);
        this.floor = this.getSprite(CaveType.Floor);
    }
}