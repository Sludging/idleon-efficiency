import { MonumentBonusModel } from './monumentBonusModel';
import { MonumentUnlockModel } from './monumentUnlockModel';

export interface MonumentModel {
    index: number,
    name: string,
    unlocks: MonumentUnlockModel[],
    bonuses: MonumentBonusModel[]
}
