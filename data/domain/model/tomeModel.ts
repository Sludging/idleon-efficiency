import { TomeScalingEnum } from '../enum/tomeScalingEnum';

export interface TomeModel {
    name: string,
    keyQty: number,
    scalingType: TomeScalingEnum,
    totalVal: number,
    decimalDisplay?: number,
    desc?: string
}
