import { SpriteSheet } from "excalibur";

import { Resources } from "../resources";

export class CreepSpriteSheet extends SpriteSheet {
    
    constructor(resources: Resources) {
        
        const resource = resources.CreepSheet;
        
        super(
            resource,
            4,
            4,
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
            4,
            5,
            6,
            7
        ];
    }

    public getIdleUpIndices(): number[] { 
        return [
            8,
            9,
            10,
            11
        ];
    }

    public getIdleLeftIndices(): number[] { 
        return [
            12,
            13,
            14,
            15
        ];
    }
}