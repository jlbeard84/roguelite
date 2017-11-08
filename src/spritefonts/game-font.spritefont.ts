import { SpriteFont } from "excalibur";

import { Resources } from "../resources";

export class GameFont extends SpriteFont {

    constructor(resources: Resources) {
        
        const resource = resources.GameFontSheet;

        super(
            resource,
            " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\]^_`abcdefghijklmnopqrstuvwxyz{|}~ ",
            false,
            32,
            3,
            18,
            32);
    }
}