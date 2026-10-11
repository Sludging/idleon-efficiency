import { CropScientistBonusModel } from '../model/cropScientistBonusModel';
import { FarmingMetadataModel } from '../model/farmingMetadataModel';

export class FarmingMetadataBase { constructor(public index: number, public data: FarmingMetadataModel) { } }



export const initFarmingMetadataRepo = () => {
    return [    
        new FarmingMetadataBase(0, <FarmingMetadataModel>{
                "cropScientistBonuses": [
                    <CropScientistBonusModel>{"index": 0, "description": "+{% DMG", "unlockUpgradeIndex": 27},
                    <CropScientistBonusModel>{"index": 1, "description": "}x Gaming Evo", "unlockUpgradeIndex": 24},
                    <CropScientistBonusModel>{"index": 2, "description": "+{% Jade", "unlockUpgradeIndex": 25},
                    <CropScientistBonusModel>{"index": 3, "description": "}x Meal Spd", "unlockUpgradeIndex": 26},
                    <CropScientistBonusModel>{"index": 4, "description": "+{% Cash", "unlockUpgradeIndex": 23},
                    <CropScientistBonusModel>{"index": 5, "description": "+{% Mobs", "unlockUpgradeIndex": 28},
                    <CropScientistBonusModel>{"index": 6, "description": "+{ Critters", "unlockUpgradeIndex": 29},
                    <CropScientistBonusModel>{"index": 7, "description": "+{% DR", "unlockUpgradeIndex": 38},
                    <CropScientistBonusModel>{"index": 8, "description": "+{% Spelunky", "unlockUpgradeIndex": 40},
                    <CropScientistBonusModel>{"index": 9, "description": "+{% Research XP", "unlockUpgradeIndex": 44}
                ]
            })    
]
}
