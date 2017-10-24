import { SpriteSheet } from "excalibur";

import { Resources } from "../resources";

export class CharacterIdleSpriteSheet extends SpriteSheet {
    
    constructor(resources: Resources) {
        
        const resource = resources.CharacterSheet;
        
        super(
            resource,
            4,
            1,
            16,
            32
        );
    }
}