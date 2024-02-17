import { BaseNinjaItemModel } from './baseNinjaItemModel';
import { NinjaItemTypeEnum } from '../enum/ninjaItemTypeEnum';

export interface NinjaTrinketModel extends BaseNinjaItemModel {
    x1: number,
    bonus: string,
    x3: number
}
