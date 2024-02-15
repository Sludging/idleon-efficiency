import { BaseNinjaItemModel } from './baseNinjaItemModel';
import { NinjaItemTypeEnum } from '../enum/ninjaItemTypeEnum';

export interface NinjaPristineCharmModel extends BaseNinjaItemModel {
    x1: number,
    desc: string,
    bonus: string
}
