import { ArcadeBonusModel } from '../model/arcadeBonusModel';

export class ArcadeBonusBase { constructor(public index: number, public data: ArcadeBonusModel) { } }



export const initArcadeBonusRepo = () => {
    return [    
        new ArcadeBonusBase(0, <ArcadeBonusModel>{
                "effect": "+{ Base Damage",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ Dmg"
            }),
        new ArcadeBonusBase(1, <ArcadeBonusModel>{
                "effect": "+{ Base Defence",
                "x1": 0.2,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ Def"
            }),
        new ArcadeBonusBase(2, <ArcadeBonusModel>{
                "effect": "+{% Total Accuracy",
                "x1": 60,
                "x2": 100,
                "func": "decay",
                "type": "",
                "lvlUpText": "+{% Acc"
            }),
        new ArcadeBonusBase(3, <ArcadeBonusModel>{
                "effect": "+{% Mining EXP gain",
                "x1": 60,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Min EXP"
            }),
        new ArcadeBonusBase(4, <ArcadeBonusModel>{
                "effect": "+{% Fishing EXP gain",
                "x1": 60,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Fish EXP"
            }),
        new ArcadeBonusBase(5, <ArcadeBonusModel>{
                "effect": "+{% Sample Size",
                "x1": 4,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Size"
            }),
        new ArcadeBonusBase(6, <ArcadeBonusModel>{
                "effect": "+{% AFK Gains Rate",
                "x1": 4,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Rate"
            }),
        new ArcadeBonusBase(7, <ArcadeBonusModel>{
                "effect": "+{ Cap for all Liquids",
                "x1": 25,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{ Cap"
            }),
        new ArcadeBonusBase(8, <ArcadeBonusModel>{
                "effect": "+{% Multikill per Tier",
                "x1": 10,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Multikill"
            }),
        new ArcadeBonusBase(9, <ArcadeBonusModel>{
                "effect": "+{% Catching EXP gain",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Catch EXP"
            }),
        new ArcadeBonusBase(10, <ArcadeBonusModel>{
                "effect": "+{% Cash from Mobs",
                "x1": 20,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Cash"
            }),
        new ArcadeBonusBase(11, <ArcadeBonusModel>{
                "effect": "+{% Cash from Mobs",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Cash"
            }),
        new ArcadeBonusBase(12, <ArcadeBonusModel>{
                "effect": "+{% Class EXP gain",
                "x1": 20,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% EXP"
            }),
        new ArcadeBonusBase(13, <ArcadeBonusModel>{
                "effect": "+{% Shiny Chance",
                "x1": 100,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Chance"
            }),
        new ArcadeBonusBase(14, <ArcadeBonusModel>{
                "effect": "+{% Trapping EXP",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Trap EXP"
            }),
        new ArcadeBonusBase(15, <ArcadeBonusModel>{
                "effect": "+{ Starting TD Pts",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ Worship Pts"
            }),
        new ArcadeBonusBase(16, <ArcadeBonusModel>{
                "effect": "+{ Tab 1 Talent Pt",
                "x1": 1,
                "x2": 10,
                "func": "intervalAdd",
                "type": "",
                "lvlUpText": "+1 Pt per 10 LVs"
            }),
        new ArcadeBonusBase(17, <ArcadeBonusModel>{
                "effect": "+{ Weapon Power",
                "x1": 0.07,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ Wep POW"
            }),
        new ArcadeBonusBase(18, <ArcadeBonusModel>{
                "effect": "+{% Skill EXP gain",
                "x1": 20,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% EXP"
            }),
        new ArcadeBonusBase(19, <ArcadeBonusModel>{
                "effect": "+{ Base STR",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ STR"
            }),
        new ArcadeBonusBase(20, <ArcadeBonusModel>{
                "effect": "+{ Base AGI",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ AGI"
            }),
        new ArcadeBonusBase(21, <ArcadeBonusModel>{
                "effect": "+{ Base WIS",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ WIS"
            }),
        new ArcadeBonusBase(22, <ArcadeBonusModel>{
                "effect": "+{ Base LUK",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ LUK"
            }),
        new ArcadeBonusBase(23, <ArcadeBonusModel>{
                "effect": "+{% Trapping Critters",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Critters"
            }),
        new ArcadeBonusBase(24, <ArcadeBonusModel>{
                "effect": "+{% Worship Souls",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Souls"
            }),
        new ArcadeBonusBase(25, <ArcadeBonusModel>{
                "effect": "+{% Refinery Speed",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Speed"
            }),
        new ArcadeBonusBase(26, <ArcadeBonusModel>{
                "effect": "+{% Forge Capacity",
                "x1": 100,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Cap"
            }),
        new ArcadeBonusBase(27, <ArcadeBonusModel>{
                "effect": "+{% Drop Rate",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Drop"
            }),
        new ArcadeBonusBase(28, <ArcadeBonusModel>{
                "effect": "+{% Cook SPD multi",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% SPD"
            }),
        new ArcadeBonusBase(29, <ArcadeBonusModel>{
                "effect": "+{% Lab EXP gain",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% EXP"
            }),
        new ArcadeBonusBase(30, <ArcadeBonusModel>{
                "effect": "+{% Breed Pet DMG",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% DMG"
            }),
        new ArcadeBonusBase(31, <ArcadeBonusModel>{
                "effect": "+{% Nugget Regen",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Regen"
            }),
        new ArcadeBonusBase(32, <ArcadeBonusModel>{
                "effect": "+{% Arti Find",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Chance"
            }),
        new ArcadeBonusBase(33, <ArcadeBonusModel>{
                "effect": "+{% Sailing Loot",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Loot"
            }),
        new ArcadeBonusBase(34, <ArcadeBonusModel>{
                "effect": "+{% W Ess gain",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% W Ess"
            }),
        new ArcadeBonusBase(35, <ArcadeBonusModel>{
                "effect": "+{% Jade gain",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Jade"
            }),
        new ArcadeBonusBase(36, <ArcadeBonusModel>{
                "effect": "+{% Farming EXP",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% EXP"
            }),
        new ArcadeBonusBase(37, <ArcadeBonusModel>{
                "effect": "+{% Divinity EXP",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% EXP"
            }),
        new ArcadeBonusBase(38, <ArcadeBonusModel>{
                "effect": "+{% Villager XP multi",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% XP multi"
            }),
        new ArcadeBonusBase(39, <ArcadeBonusModel>{
                "effect": "+{% Gold Ball Gain",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Balls"
            }),
        new ArcadeBonusBase(40, <ArcadeBonusModel>{
                "effect": "+{% Deathbringer Bones",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Bones"
            }),
        new ArcadeBonusBase(41, <ArcadeBonusModel>{
                "effect": "+{% Equinox Fill Rate",
                "x1": 0.75,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Fill Rate"
            }),
        new ArcadeBonusBase(42, <ArcadeBonusModel>{
                "effect": "+{% Monument AFK",
                "x1": 0.5,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% AFK"
            }),
        new ArcadeBonusBase(43, <ArcadeBonusModel>{
                "effect": "+{% Sigil Speed",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Speed"
            }),
        new ArcadeBonusBase(44, <ArcadeBonusModel>{
                "effect": "+{% Construction Build",
                "x1": 2,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Build Rate"
            }),
        new ArcadeBonusBase(45, <ArcadeBonusModel>{
                "effect": "+{% Burger",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Burger"
            }),
        new ArcadeBonusBase(46, <ArcadeBonusModel>{
                "effect": "+{% Total Damage",
                "x1": 2,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Damage"
            }),
        new ArcadeBonusBase(47, <ArcadeBonusModel>{
                "effect": "+{% Windwalker Dust",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Dust"
            }),
        new ArcadeBonusBase(48, <ArcadeBonusModel>{
                "effect": "+{% Medallion Chance",
                "x1": 0.5,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Chance"
            }),
        new ArcadeBonusBase(49, <ArcadeBonusModel>{
                "effect": "+{% Breedability Rate",
                "x1": 100,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Breed Rate"
            })    
]
}
