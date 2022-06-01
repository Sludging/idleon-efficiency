import { BagTypeEnum } from '../enum/bagTypeEnum';
import { ClassTypeEnum } from '../enum/classTypeEnum';
import { CommonItemModel } from './commonItemModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface EquipItemModel extends CommonItemModel {
    lvReqToEquip: number,
    Class: (BagTypeEnum | ClassTypeEnum),
    Speed: number,
    Reach: number,
    Weapon_Power: number,
    STR: number,
    AGI: number,
    WIS: number,
    LUK: number,
    Defence: number,
    UQ1txt: string,
    UQ1val: number,
    UQ2txt: string,
    UQ2val: number,
    Upgrade_Slots_Left: number
}
