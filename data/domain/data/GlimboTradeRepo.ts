import { GlimboTradeModel } from '../model/glimboTradeModel';

export class GlimboTradeBase { constructor(public index: number, public data: GlimboTradeModel) { } }



export const initGlimboTradeRepo = () => {
    return [    
        new GlimboTradeBase(0, <GlimboTradeModel>{
                "index": 0,
                "vaultUpgradeIndex": 2,
                "costItem": "Coral3",
                "costScaling": 1.06,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(1, <GlimboTradeModel>{
                "index": 1,
                "vaultUpgradeIndex": 3,
                "costItem": "Pearl6",
                "costScaling": 1.005,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(2, <GlimboTradeModel>{
                "index": 2,
                "vaultUpgradeIndex": 13,
                "costItem": "Refinery3",
                "costScaling": 1.2,
                "enhancedMaxLevelEligible": false
            }),
        new GlimboTradeBase(3, <GlimboTradeModel>{
                "index": 3,
                "vaultUpgradeIndex": 21,
                "costItem": "Refinery4",
                "costScaling": 1.1,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(4, <GlimboTradeModel>{
                "index": 4,
                "vaultUpgradeIndex": 32,
                "costItem": "w7B1b",
                "costScaling": 1.4,
                "enhancedMaxLevelEligible": false
            }),
        new GlimboTradeBase(5, <GlimboTradeModel>{
                "index": 5,
                "vaultUpgradeIndex": 43,
                "costItem": "Critter7A",
                "costScaling": 1.06,
                "enhancedMaxLevelEligible": false
            }),
        new GlimboTradeBase(6, <GlimboTradeModel>{
                "index": 6,
                "vaultUpgradeIndex": 45,
                "costItem": "Refinery5",
                "costScaling": 1.1,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(7, <GlimboTradeModel>{
                "index": 7,
                "vaultUpgradeIndex": 50,
                "costItem": "Coral4",
                "costScaling": 1.06,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(8, <GlimboTradeModel>{
                "index": 8,
                "vaultUpgradeIndex": 54,
                "costItem": "Refinery6",
                "costScaling": 1.1,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(9, <GlimboTradeModel>{
                "index": 9,
                "vaultUpgradeIndex": 56,
                "costItem": "Critter9A",
                "costScaling": 1.05,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(10, <GlimboTradeModel>{
                "index": 10,
                "vaultUpgradeIndex": 57,
                "costItem": "Timecandy5",
                "costScaling": 1.01,
                "enhancedMaxLevelEligible": false
            }),
        new GlimboTradeBase(11, <GlimboTradeModel>{
                "index": 11,
                "vaultUpgradeIndex": 58,
                "costItem": "Refinery7",
                "costScaling": 1.1,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(12, <GlimboTradeModel>{
                "index": 12,
                "vaultUpgradeIndex": 61,
                "costItem": "Refinery8",
                "costScaling": 1.3,
                "enhancedMaxLevelEligible": false
            }),
        new GlimboTradeBase(13, <GlimboTradeModel>{
                "index": 13,
                "vaultUpgradeIndex": 63,
                "costItem": "Soul8",
                "costScaling": 1.35,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(14, <GlimboTradeModel>{
                "index": 14,
                "vaultUpgradeIndex": 65,
                "costItem": "Quest110",
                "costScaling": 1.35,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(15, <GlimboTradeModel>{
                "index": 15,
                "vaultUpgradeIndex": 68,
                "costItem": "w7B11b",
                "costScaling": 1.25,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(16, <GlimboTradeModel>{
                "index": 16,
                "vaultUpgradeIndex": 71,
                "costItem": "Critter10A",
                "costScaling": 1.07,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(17, <GlimboTradeModel>{
                "index": 17,
                "vaultUpgradeIndex": 75,
                "costItem": "Ladle",
                "costScaling": 1.25,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(18, <GlimboTradeModel>{
                "index": 18,
                "vaultUpgradeIndex": 81,
                "costItem": "Critter11",
                "costScaling": 1.2,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(19, <GlimboTradeModel>{
                "index": 19,
                "vaultUpgradeIndex": 85,
                "costItem": "Spelunking4",
                "costScaling": 1.25,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(20, <GlimboTradeModel>{
                "index": 20,
                "vaultUpgradeIndex": 87,
                "costItem": "SilverPen",
                "costScaling": 1.5,
                "enhancedMaxLevelEligible": true
            }),
        new GlimboTradeBase(21, <GlimboTradeModel>{
                "index": 21,
                "vaultUpgradeIndex": 89,
                "costItem": "Refinery9",
                "costScaling": 1.5,
                "enhancedMaxLevelEligible": false
            })    
]
}
