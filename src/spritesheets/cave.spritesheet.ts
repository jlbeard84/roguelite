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

    constructor(resources: Resources) {

        const resource = resources.CaveMap;

        super(
            resource,
            16,
            10,
            16,
            16
        );

        this.topWall = this.getSprite(92);
        this.bottomWall = this.getSprite(60);
        this.leftWall = this.getSprite(77);
        this.rightWall = this.getSprite(75);
        this.topLeftWall = this.getSprite(62);
        this.topRightWall = this.getSprite(63);
        this.bottomLeftWall = this.getSprite(78);
        this.bottomRightWall = this.getSprite(79);
        this.floor = this.getSprite(0);
    }
}