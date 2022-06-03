import { DescItemModel } from './descItemModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface InvBagItemModel extends DescItemModel {
    order: number,
    level: number
}
