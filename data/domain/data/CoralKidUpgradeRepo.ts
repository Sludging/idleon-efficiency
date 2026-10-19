import { CoralKidUpgradeModel } from '../model/coralKidUpgradeModel';

export class CoralKidUpgradeBase { constructor(public index: number, public data: CoralKidUpgradeModel) { } }



export const initCoralKidUpgradeRepo = () => {
    return [    
        new CoralKidUpgradeBase(0, <CoralKidUpgradeModel>{
                "index": 0,
                "description": "Lets you click the volcano, linking the divinity of your choice to ALL players! Also, }x Divinity EXP gain for all!",
                "mode": "original"
            }),
        new CoralKidUpgradeBase(1, <CoralKidUpgradeModel>{
                "index": 1,
                "description": "The Max Level of the ''Blessing'' upgrade for each @ Divinity is +{ levels higher!",
                "mode": "original"
            }),
        new CoralKidUpgradeBase(2, <CoralKidUpgradeModel>{
                "index": 2,
                "description": "God Rank now also gives }x Class EXP to all players! @ Total Bonus:$x Class EXP",
                "mode": "original"
            }),
        new CoralKidUpgradeBase(3, <CoralKidUpgradeModel>{
                "index": 3,
                "description": "Divinity Skill Lv boosts Minor Link Bonuses a bit more! @ (Your Divinity LV of $ boosts Minor Link Bonuses by ^x)",
                "mode": "original"
            }),
        new CoralKidUpgradeBase(4, <CoralKidUpgradeModel>{
                "index": 4,
                "description": "Boosts Divinity PTS gain by +{% per Coral Reef upgrade! Total Bonus:+$% Divinity PTS",
                "mode": "original"
            }),
        new CoralKidUpgradeBase(5, <CoralKidUpgradeModel>{
                "index": 5,
                "description": "You now generate {% more Daily Coral for the Coral Reef back in W7 town!",
                "mode": "original"
            }),
        new CoralKidUpgradeBase(6, <CoralKidUpgradeModel>{
                "index": 6,
                "description": "You can Transmute Divinity PTS into Singularity Spirals! Get Time Elapse by claiming Divinity AFK. Also, }x Div PTS",
                "mode": "singularity"
            }),
        new CoralKidUpgradeBase(7, <CoralKidUpgradeModel>{
                "index": 7,
                "description": "The base value of the Transmute, which is based on how many Divinity PTS you have, is now }x higher!",
                "mode": "singularity"
            }),
        new CoralKidUpgradeBase(8, <CoralKidUpgradeModel>{
                "index": 8,
                "description": "Your Divinity EXP gain for all characters is boosted by a staggering }x",
                "mode": "singularity"
            }),
        new CoralKidUpgradeBase(9, <CoralKidUpgradeModel>{
                "index": 9,
                "description": "You now get Time Elapsed when claiming any AFK Gains, not just from Divinity skill! However, you only get $% as many hours.",
                "mode": "singularity"
            }),
        new CoralKidUpgradeBase(10, <CoralKidUpgradeModel>{
                "index": 10,
                "description": "Boosts your Lumi hourly gain over at the Luminous Menagerie by a massive }x",
                "mode": "singularity"
            }),
        new CoralKidUpgradeBase(11, <CoralKidUpgradeModel>{
                "index": 11,
                "description": "Each God Rank above 25 now also gives }x DMG to all players! Total Bonus:$x DMG Multi",
                "mode": "singularity"
            })    
]
}
