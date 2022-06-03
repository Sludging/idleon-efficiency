import { DescItemModel } from './descItemModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface ChestItemModel extends DescItemModel {
    order: number,
    level: number
}
