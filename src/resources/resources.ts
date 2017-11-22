import { Loader, ILoadable, Texture } from "excalibur";

export class Resources {

    public CaveMapSheet: Texture = new Texture("/assets/cave.png");
    public CharacterSheet: Texture = new Texture("/assets/character.png");
    public CharacterAttackSheet: Texture = new Texture("/assets/character-attack.png");
    public CreepSheet: Texture = new Texture("/assets/creep.png");
    public GameFontSheet: Texture = new Texture("/assets/game-font.png");

    private resources: ILoadable[] = [
        this.CaveMapSheet,
        this.CharacterSheet,
        this.CharacterAttackSheet,
        this.CreepSheet,
        this.GameFontSheet
    ]

    public load(loader: Loader): void {
        loader.addResources(this.resources);
    }
}