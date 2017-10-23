import { Loader } from "excalibur";

import { Resources } from "../resources";

export class RlLoader extends Loader {

    public resources: Resources = new Resources();

    constructor() {
        super();

        this.resources.load(this);
    }
}