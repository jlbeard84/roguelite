import { Room } from "../entities";
import { CaveType } from "../enums";

export class CaveRooms {

    public static Rooms: Room<CaveType>[] = [ 
        new Room<CaveType>([
            [
                CaveType.TopLeftWall, CaveType.TopWall, CaveType.TopWall, CaveType.TopWall, CaveType.TopWall, CaveType.TopWall, CaveType.TopWall, CaveType.TopWall, CaveType.TopWall, CaveType.TopRightWall
            ], [
                CaveType.LeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.RightWall
            ], [
                CaveType.LeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.RightWall
            ], [
                CaveType.LeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.RightWall
            ], [
                CaveType.LeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.RightWall
            ], [
                CaveType.LeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.RightWall
            ], [
                CaveType.LeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.RightWall
            ], [
                CaveType.LeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.RightWall
            ], [
                CaveType.LeftWall, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.Floor, CaveType.RightWall
            ], [
                CaveType.BottomLeftWall, CaveType.BottomWall, CaveType.BottomWall, CaveType.BottomWall, CaveType.BottomWall, CaveType.BottomWall, CaveType.BottomWall, CaveType.BottomWall, CaveType.BottomWall, CaveType.BottomRightWall
            ]
        ])
    ];
}
