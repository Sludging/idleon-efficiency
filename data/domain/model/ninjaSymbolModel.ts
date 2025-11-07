import { BaseNinjaItemModel } from './baseNinjaItemModel';
import { NinjaItemTypeEnum } from '../enum/ninjaItemTypeEnum';

export interface NinjaSymbolModel extends BaseNinjaItemModel {
    x1: number,
    desc: string,
    bonus: string
}
