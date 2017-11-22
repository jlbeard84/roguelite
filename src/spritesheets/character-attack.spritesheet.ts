import { SpriteSheet } from "excalibur";

import { Resources } from "../resources";

export class CharacterAttackSpriteSheet extends SpriteSheet {
    
    constructor(resources: Resources) {
        
        const resource = resources.CharacterAttackSheet;
        
        super(
            resource,
            4,
            4,
            30,
            30
        );
    }

    public getDownIndices(): number[] { 
        return [
            0,
            1,
            2,
            3
        ];
    }

    public getRightIndices(): number[] { 
        return [
            8,
            9,
            10,
            11
        ];
    }

    public getUpIndices(): number[] { 
        return [
            4,
            5,
            6,
            7
        ];
    }

    public getLeftIndices(): number[] { 
        return [
            12,
            13,
            14,
            15
        ];
    }
}