import { Loader, ILoadable, Texture } from "excalibur";

export class Resources {

    public CaveMapSheet: Texture = new Texture("/assets/cave.png");
    public CharacterSheet: Texture = new Texture("/assets/character.png");

    private resources: ILoadable[] = [
        this.CaveMapSheet,
        this.CharacterSheet
    ]

    public load(loader: Loader): void {
        loader.addResources(this.resources);
    }
}