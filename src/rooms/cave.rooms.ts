import { CaveType } from "../enums";

export class CaveRooms {

    public LeftRooms: CaveType[][][] = [
        //room 1 
        [
            [
                CaveType.LeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor
            ], [
                CaveType.BottomLeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor
            ], [
                CaveType.BlankSpace, CaveType.LeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor
            ], [
                CaveType.TopLeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor
            ], [
                CaveType.LeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor
            ], 
        ],
        //room 2
        [

        ]
    ]

}