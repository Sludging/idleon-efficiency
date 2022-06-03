import { DescItemModel } from './descItemModel';
import { GoldenFoodDataModel } from './goldenFoodDataModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface GoldenFoodItemModel extends DescItemModel {
    goldenFoodData: GoldenFoodDataModel
}
