import { SummonStoneBossModel } from './summonStoneBossModel';

export interface SummonStoneBossMetadataModel {
    bosses: SummonStoneBossModel[],
    trialWinScalingBase: number
}
