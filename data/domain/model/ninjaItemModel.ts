import { BaseNinjaItemModel } from './baseNinjaItemModel';
import { NinjaItemTypeEnum } from '../enum/ninjaItemTypeEnum';

export interface NinjaItemModel extends BaseNinjaItemModel {
    desc: string,
    filler: string
}
