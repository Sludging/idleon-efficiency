import { ClassTypeEnum } from '../enum/classTypeEnum';
import { StatItemModel } from './statItemModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface ObolItemModel extends StatItemModel {
    family: string,
    rarity: string,
    Skill: string,
    Skill_Power: number
}
