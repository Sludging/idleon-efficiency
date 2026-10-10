import { LogMinigameRankModel } from './logMinigameRankModel';
import { PlantStagePaletteLuckModel } from './plantStagePaletteLuckModel';
import { RatShopUpgradeModel } from './ratShopUpgradeModel';

export interface GamingMetadataModel {
    plantStagePaletteLuck: PlantStagePaletteLuckModel[],
    logMinigameRanks: LogMinigameRankModel[],
    ratShopUpgrades: RatShopUpgradeModel[]
}
