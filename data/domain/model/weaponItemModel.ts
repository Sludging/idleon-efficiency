import { ClassTypeEnum } from '../enum/classTypeEnum';
import { StatItemModel } from './statItemModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface WeaponItemModel extends StatItemModel {
    Speed: number,
    Reach: number
}
