import { NinjaFloorDropModel } from './ninjaFloorDropModel';

export interface NinjaFloorModel {
    floorIndex: number,
    baseDoorHp: number,
    baseDetectionThreshold: number,
    baseJadePerAction: number,
    baseXpPerAction: number,
    drops: NinjaFloorDropModel[]
}
