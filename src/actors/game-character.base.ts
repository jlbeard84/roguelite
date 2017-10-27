import { Actor, CollisionType, Input } from "excalibur";

export abstract class GameCharacterBase extends Actor {

    public hasActiveTurn: boolean;
    public turnEndedEventName: string = "turnEnded";

    constructor() {
        super();

        this.collisionType = CollisionType.Active;
    }
}