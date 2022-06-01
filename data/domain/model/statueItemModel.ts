import { BonusItemModel } from './bonusItemModel';
import { StatueDataModel } from './statueDataModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface StatueItemModel extends BonusItemModel {
    statueData: StatueDataModel
}
