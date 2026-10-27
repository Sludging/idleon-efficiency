import { AFKTypeEnum } from '../enum/aFKTypeEnum';

export interface MapInfoModel {
    id: number,
    portalRequirements: number[],
    maxOnScreen: number,
    movementDistance: number,
    afkTarget: string,
    afkType?: AFKTypeEnum,
    x: number,
    y: number
}
