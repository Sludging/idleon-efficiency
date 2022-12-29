import { ClassTypeEnum } from '../enum/classTypeEnum';
import { StatItemModel } from './statItemModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface SkullItemModel extends StatItemModel {
    Skill: string,
    Skill_Power: number,
    Speed: number,
    maxCharge: number
}
