import { SpelunkingToolModel } from '../model/spelunkingToolModel';
import { SpelunkingToolUnlockModel } from '../model/spelunkingToolUnlockModel';

export class SpelunkingToolBase { constructor(public index: number, public data: SpelunkingToolModel) { } }



export const initSpelunkingToolRepo = () => {
    return [    
        new SpelunkingToolBase(0, <SpelunkingToolModel>{
                "index": 0,
                "name": "Hammer",
                "baseStaminaCost": 1,
                "hitRadius": 23,
                "damageMultiplier": 1,
                "unlock": <SpelunkingToolUnlockModel>{"kind": "default", "upgradeIndex": undefined, "minimumBonus": undefined}
            }),
        new SpelunkingToolBase(1, <SpelunkingToolModel>{
                "index": 1,
                "name": "Mace",
                "baseStaminaCost": 2,
                "hitRadius": 40,
                "damageMultiplier": 2,
                "unlock": <SpelunkingToolUnlockModel>{"kind": "upgrade", "upgradeIndex": 14, "minimumBonus": 1}
            }),
        new SpelunkingToolBase(2, <SpelunkingToolModel>{
                "index": 2,
                "name": "Mallet",
                "baseStaminaCost": 3,
                "hitRadius": 50,
                "damageMultiplier": 4,
                "unlock": <SpelunkingToolUnlockModel>{"kind": "upgrade", "upgradeIndex": 15, "minimumBonus": 1}
            }),
        new SpelunkingToolBase(3, <SpelunkingToolModel>{
                "index": 3,
                "name": "Flail",
                "baseStaminaCost": 4,
                "hitRadius": 60,
                "damageMultiplier": 7,
                "unlock": <SpelunkingToolUnlockModel>{"kind": "upgrade", "upgradeIndex": 16, "minimumBonus": 1}
            }),
        new SpelunkingToolBase(4, <SpelunkingToolModel>{
                "index": 4,
                "name": "Warhammer",
                "baseStaminaCost": 7,
                "hitRadius": 85,
                "damageMultiplier": 15,
                "unlock": <SpelunkingToolUnlockModel>{"kind": "upgrade", "upgradeIndex": 17, "minimumBonus": 1}
            }),
        new SpelunkingToolBase(5, <SpelunkingToolModel>{
                "index": 5,
                "name": "Scepter",
                "baseStaminaCost": 15,
                "hitRadius": 130,
                "damageMultiplier": 50,
                "unlock": <SpelunkingToolUnlockModel>{"kind": "unavailable", "upgradeIndex": undefined, "minimumBonus": undefined}
            }),
        new SpelunkingToolBase(6, <SpelunkingToolModel>{
                "index": 6,
                "name": "Mjolnir",
                "baseStaminaCost": 25,
                "hitRadius": 35,
                "damageMultiplier": 250,
                "unlock": <SpelunkingToolUnlockModel>{"kind": "unavailable", "upgradeIndex": undefined, "minimumBonus": undefined}
            })    
]
}
