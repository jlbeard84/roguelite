export class Room<T> {

    constructor(indexArray: number[][]) {
        this.indexArray = indexArray;
    }

    public indexArray: number[][] = [];
    public enumType: T;
}