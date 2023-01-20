import { PostOfficeUpgradeModel } from './postOfficeUpgradeModel';

export interface PostOfficeUpgradesModel {
    name: string,
    bonuses: PostOfficeUpgradeModel[],
    maxLevel: number
}
