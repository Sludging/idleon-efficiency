import { MenagerieJellyfishCurrencyModel } from './menagerieJellyfishCurrencyModel';
import { MenagerieJellyfishRewardModel } from './menagerieJellyfishRewardModel';
import { MenagerieJellyfishUpgradeModel } from './menagerieJellyfishUpgradeModel';

export interface MenagerieJellyfishModel {
    index: number,
    color: string,
    unlockId: number,
    description: string,
    label: string,
    currency?: MenagerieJellyfishCurrencyModel,
    upgrades?: MenagerieJellyfishUpgradeModel[],
    reward?: MenagerieJellyfishRewardModel
}
