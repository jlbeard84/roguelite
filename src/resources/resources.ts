import { Loader, ILoadable, Texture } from "excalibur";

export class Resources {

    public CaveMap: Texture = new Texture("/assets/cave.png");

    private resources: ILoadable[] = [
        this.CaveMap
    ]

    public load(loader: Loader): void {
        loader.addResources(this.resources);
    }
}