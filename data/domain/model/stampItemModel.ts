import { BonusItemModel } from './bonusItemModel';
import { StampDataModel } from './stampDataModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface StampItemModel extends BonusItemModel {
    ID: number,
    stampData: StampDataModel
}
