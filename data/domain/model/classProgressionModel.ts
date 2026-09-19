import { ClassAccountBonusModel } from './classAccountBonusModel';
import { ClassFamilyBonusModel } from './classFamilyBonusModel';
import { ClassPromotionChoiceModel } from './classPromotionChoiceModel';
import { ClassSpecializeSkillModel } from './classSpecializeSkillModel';

export interface ClassProgressionModel {
    classNames: string[],
    familyBonuses: ClassFamilyBonusModel[],
    familyBonusDisplayOrder: number[],
    specializeSkills: ClassSpecializeSkillModel[],
    accountBonuses: ClassAccountBonusModel[],
    promotionChoices: ClassPromotionChoiceModel[]
}
