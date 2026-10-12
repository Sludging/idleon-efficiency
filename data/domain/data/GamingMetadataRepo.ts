import { GamingMetadataModel } from '../model/gamingMetadataModel';
import { LogMinigameRankModel } from '../model/logMinigameRankModel';
import { PlantStagePaletteLuckModel } from '../model/plantStagePaletteLuckModel';
import { RatShopUpgradeModel } from '../model/ratShopUpgradeModel';

export class GamingMetadataBase { constructor(public index: number, public data: GamingMetadataModel) { } }



export const initGamingMetadataRepo = () => {
    return [    
        new GamingMetadataBase(0, <GamingMetadataModel>{
                "plantStagePaletteLuck": [
                    <PlantStagePaletteLuckModel>{"plantStage": 0, "multiplier": 1},
                    <PlantStagePaletteLuckModel>{"plantStage": 1, "multiplier": 1.5},
                    <PlantStagePaletteLuckModel>{"plantStage": 2, "multiplier": 2},
                    <PlantStagePaletteLuckModel>{"plantStage": 3, "multiplier": 3},
                    <PlantStagePaletteLuckModel>{"plantStage": 4, "multiplier": 5},
                    <PlantStagePaletteLuckModel>{"plantStage": 5, "multiplier": 10},
                    <PlantStagePaletteLuckModel>{"plantStage": 6, "multiplier": 25},
                    <PlantStagePaletteLuckModel>{"plantStage": 7, "multiplier": 100}
                ],
                "logMinigameRanks": [
                    <LogMinigameRankModel>{"rank": 0, "deathCardCount": 1, "progressHours": 1},
                    <LogMinigameRankModel>{"rank": 1, "deathCardCount": 1, "progressHours": 1},
                    <LogMinigameRankModel>{"rank": 2, "deathCardCount": 1, "progressHours": 2},
                    <LogMinigameRankModel>{"rank": 3, "deathCardCount": 2, "progressHours": 3},
                    <LogMinigameRankModel>{"rank": 4, "deathCardCount": 3, "progressHours": 5},
                    <LogMinigameRankModel>{"rank": 5, "deathCardCount": 4, "progressHours": 8},
                    <LogMinigameRankModel>{"rank": 6, "deathCardCount": 5, "progressHours": 12},
                    <LogMinigameRankModel>{"rank": 7, "deathCardCount": 7, "progressHours": 24},
                    <LogMinigameRankModel>{"rank": 8, "deathCardCount": 8, "progressHours": 36},
                    <LogMinigameRankModel>{"rank": 9, "deathCardCount": 9, "progressHours": 72},
                    <LogMinigameRankModel>{"rank": 10, "deathCardCount": 9, "progressHours": 96},
                    <LogMinigameRankModel>{"rank": 11, "deathCardCount": 9, "progressHours": 96},
                    <LogMinigameRankModel>{"rank": 12, "deathCardCount": 9, "progressHours": 120}
                ],
                "ratShopUpgrades": [
                    <RatShopUpgradeModel>{"upgradeId": 0, "label": "+{% extra King Tokens/hr"},
                    <RatShopUpgradeModel>{"upgradeId": 1, "label": "}x Palette Luck Multi"},
                    <RatShopUpgradeModel>{"upgradeId": 2, "label": "}x chance to find Crowns"}
                ]
            })    
]
}
