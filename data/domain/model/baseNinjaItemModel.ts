import { NinjaItemTypeEnum } from '../enum/ninjaItemTypeEnum';

export interface BaseNinjaItemModel {
    internalId: string,
    itemTypeId: number,
    itemType: NinjaItemTypeEnum,
    itemId: number,
    name: string
}
