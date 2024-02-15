import { BaseNinjaItemModel } from './baseNinjaItemModel';
import { NinjaItemTypeEnum } from '../enum/ninjaItemTypeEnum';

export interface NinjaWeaponModel extends BaseNinjaItemModel {
    x1: number,
    x2: number
}
