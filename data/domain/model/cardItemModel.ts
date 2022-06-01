import { BaseItemModel } from './baseItemModel';
import { CardDataModel } from './cardDataModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface CardItemModel extends BaseItemModel {
    cardData?: CardDataModel,
    dropChance: number
}
