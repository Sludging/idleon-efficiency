import { DescItemModel } from './descItemModel';
import { FishingToolkitModel } from './fishingToolkitModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface FishingTKItemModel extends DescItemModel {
    fishingToolkit: FishingToolkitModel
}
