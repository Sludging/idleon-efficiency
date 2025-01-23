import { SedimentTypeEnum } from '../enum/sedimentTypeEnum';

export interface HoleBuildingModel {
    name: string,
    squareImageType: number,
    costType: SedimentTypeEnum,
    baseCost: number,
    costCalcType: boolean,
    desc: string,
    order: number
}
