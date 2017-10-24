import { SpriteSheet } from "excalibur";

import { Resources } from "../resources";

export class CharacterIdleSpriteSheet extends SpriteSheet {
    
    constructor(resources: Resources) {
        
        const resource = resources.CharacterSheet;
        
        super(
            resource,
            17,
            8,
            16,
            32
        );
    }

    public getIdleDownIndices(): number[] { 
        return [
            0,
            1,
            2,
            3
        ];
    }

    public getIdleRightIndices(): number[] { 
        return [
            17,
            18,
            19,
            20
        ];
    }

    public getIdleUpIndices(): number[] { 
        return [
            34,
            35,
            36,
            37
        ];
    }

    public getIdleLeftIndices(): number[] { 
        return [
            51,
            52,
            53,
            54
        ];
    }
}