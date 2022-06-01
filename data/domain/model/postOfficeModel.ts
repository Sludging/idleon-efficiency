import { PartModel } from './partModel';

export interface PostOfficeModel {
    orders: PartModel[],
    coinRewards: number[],
    rewards: PartModel[]
}
