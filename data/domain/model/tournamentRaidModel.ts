import { TournamentRewardTierModel } from './tournamentRewardTierModel';

export interface TournamentRaidModel {
    rankNames: string[],
    rankMaterials: number[],
    mapNames: string[],
    mapLimits: number[],
    rewardTiers: TournamentRewardTierModel[]
}
