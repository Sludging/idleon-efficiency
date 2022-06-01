import { ClassTypeEnum } from '../enum/classTypeEnum';
import { StatItemModel } from './statItemModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface ArmourItemModel extends StatItemModel {
    Skill: string,
    Skill_Power: number
}
