import { CosmoTypeEnum } from '../enum/cosmoTypeEnum';

export interface CosmoUpgradeModel {
    perLvl: number,
    zero: number,
    name: string,
    desc: string,
    cosmoType: CosmoTypeEnum
}
