import { Engine } from "excalibur";

export class Game extends Engine {

       constructor() {

        const defaultWidth: number = 800;
        const defaultHeight: number = 600;

        super({ 
            width: defaultWidth,
            height: defaultHeight
        });
    }
}