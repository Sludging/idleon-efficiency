import { BaseItemModel } from './baseItemModel';
import { ClassTypeEnum } from '../enum/classTypeEnum';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface StatItemModel extends BaseItemModel {
    lvReqToCraft: number,
    lvReqToEquip: number,
    Class: ClassTypeEnum,
    Weapon_Power: number,
    STR: number,
    AGI: number,
    WIS: number,
    LUK: number,
    Defence: number,
    miscUp1: string,
    miscUp2: string,
    Upgrade_Slots_Left: number
}
