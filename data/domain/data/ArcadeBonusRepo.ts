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
                "lvlUpText": "+{ Dmg",
                "barType": -1
            }),
        new ArcadeBonusBase(1, <ArcadeBonusModel>{
                "effect": "+{ Base Defence",
                "x1": 0.2,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ Def",
                "barType": -1
            }),
        new ArcadeBonusBase(2, <ArcadeBonusModel>{
                "effect": "+{% Total Accuracy",
                "x1": 60,
                "x2": 100,
                "func": "decay",
                "type": "",
                "lvlUpText": "+{% Acc",
                "barType": -1
            }),
        new ArcadeBonusBase(3, <ArcadeBonusModel>{
                "effect": "+{% Mining EXP gain",
                "x1": 60,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Min EXP",
                "barType": -1
            }),
        new ArcadeBonusBase(4, <ArcadeBonusModel>{
                "effect": "+{% Fishing EXP gain",
                "x1": 60,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Fish EXP",
                "barType": -1
            }),
        new ArcadeBonusBase(5, <ArcadeBonusModel>{
                "effect": "+{% Sample Size",
                "x1": 4,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Size",
                "barType": -1
            }),
        new ArcadeBonusBase(6, <ArcadeBonusModel>{
                "effect": "+{% AFK Gains Rate",
                "x1": 4,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Rate",
                "barType": -1
            }),
        new ArcadeBonusBase(7, <ArcadeBonusModel>{
                "effect": "+{ Cap for all Liquids",
                "x1": 25,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{ Cap",
                "barType": -1
            }),
        new ArcadeBonusBase(8, <ArcadeBonusModel>{
                "effect": "+{% Multikill per Tier",
                "x1": 10,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Multikill",
                "barType": -1
            }),
        new ArcadeBonusBase(9, <ArcadeBonusModel>{
                "effect": "+{% Catching EXP gain",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Catch EXP",
                "barType": -1
            }),
        new ArcadeBonusBase(10, <ArcadeBonusModel>{
                "effect": "+{% Cash from Mobs",
                "x1": 20,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Cash",
                "barType": -1
            }),
        new ArcadeBonusBase(11, <ArcadeBonusModel>{
                "effect": "+{% Cash from Mobs",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Cash",
                "barType": -1
            }),
        new ArcadeBonusBase(12, <ArcadeBonusModel>{
                "effect": "+{% Class EXP gain",
                "x1": 20,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% EXP",
                "barType": -1
            }),
        new ArcadeBonusBase(13, <ArcadeBonusModel>{
                "effect": "+{% Shiny Chance",
                "x1": 100,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Chance",
                "barType": -1
            }),
        new ArcadeBonusBase(14, <ArcadeBonusModel>{
                "effect": "+{% Trapping EXP",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Trap EXP",
                "barType": -1
            }),
        new ArcadeBonusBase(15, <ArcadeBonusModel>{
                "effect": "+{ Starting TD Pts",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ Worship Pts",
                "barType": -1
            }),
        new ArcadeBonusBase(16, <ArcadeBonusModel>{
                "effect": "+{ Tab 1 Talent Pt",
                "x1": 1,
                "x2": 10,
                "func": "intervalAdd",
                "type": "",
                "lvlUpText": "+1 Pt per 10 LVs",
                "barType": -1
            }),
        new ArcadeBonusBase(17, <ArcadeBonusModel>{
                "effect": "+{ Weapon Power",
                "x1": 0.07,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ Wep POW",
                "barType": -1
            }),
        new ArcadeBonusBase(18, <ArcadeBonusModel>{
                "effect": "+{% Skill EXP gain",
                "x1": 20,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% EXP",
                "barType": -1
            }),
        new ArcadeBonusBase(19, <ArcadeBonusModel>{
                "effect": "+{ Base STR",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ STR",
                "barType": -1
            }),
        new ArcadeBonusBase(20, <ArcadeBonusModel>{
                "effect": "+{ Base AGI",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ AGI",
                "barType": -1
            }),
        new ArcadeBonusBase(21, <ArcadeBonusModel>{
                "effect": "+{ Base WIS",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ WIS",
                "barType": -1
            }),
        new ArcadeBonusBase(22, <ArcadeBonusModel>{
                "effect": "+{ Base LUK",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "",
                "lvlUpText": "+{ LUK",
                "barType": -1
            }),
        new ArcadeBonusBase(23, <ArcadeBonusModel>{
                "effect": "+{% Trapping Critters",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Critters",
                "barType": -1
            }),
        new ArcadeBonusBase(24, <ArcadeBonusModel>{
                "effect": "+{% Worship Souls",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Souls",
                "barType": -1
            }),
        new ArcadeBonusBase(25, <ArcadeBonusModel>{
                "effect": "+{% Refinery Speed",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Speed",
                "barType": -1
            }),
        new ArcadeBonusBase(26, <ArcadeBonusModel>{
                "effect": "+{% Forge Capacity",
                "x1": 100,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Cap",
                "barType": -1
            }),
        new ArcadeBonusBase(27, <ArcadeBonusModel>{
                "effect": "+{% Drop Rate",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Drop",
                "barType": -1
            }),
        new ArcadeBonusBase(28, <ArcadeBonusModel>{
                "effect": "+{% Cook SPD multi",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% SPD",
                "barType": -1
            }),
        new ArcadeBonusBase(29, <ArcadeBonusModel>{
                "effect": "+{% Lab EXP gain",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% EXP",
                "barType": -1
            }),
        new ArcadeBonusBase(30, <ArcadeBonusModel>{
                "effect": "+{% Breed Pet DMG",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% DMG",
                "barType": -1
            }),
        new ArcadeBonusBase(31, <ArcadeBonusModel>{
                "effect": "+{% Nugget Regen",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Regen",
                "barType": -1
            }),
        new ArcadeBonusBase(32, <ArcadeBonusModel>{
                "effect": "+{% Artifact Find",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Chance",
                "barType": -1
            }),
        new ArcadeBonusBase(33, <ArcadeBonusModel>{
                "effect": "+{% Sailing Loot",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Loot",
                "barType": -1
            }),
        new ArcadeBonusBase(34, <ArcadeBonusModel>{
                "effect": "+{% W Ess gain",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% W Ess",
                "barType": -1
            }),
        new ArcadeBonusBase(35, <ArcadeBonusModel>{
                "effect": "+{% Jade gain",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Jade",
                "barType": -1
            }),
        new ArcadeBonusBase(36, <ArcadeBonusModel>{
                "effect": "+{% Farming EXP",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% EXP",
                "barType": -1
            }),
        new ArcadeBonusBase(37, <ArcadeBonusModel>{
                "effect": "+{% Divinity EXP",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% EXP",
                "barType": -1
            }),
        new ArcadeBonusBase(38, <ArcadeBonusModel>{
                "effect": "+{% Villager XP multi",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% XP multi",
                "barType": -1
            }),
        new ArcadeBonusBase(39, <ArcadeBonusModel>{
                "effect": "+{% Gold Ball Gain",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Balls",
                "barType": -1
            }),
        new ArcadeBonusBase(40, <ArcadeBonusModel>{
                "effect": "+{% Deathbringer Bones",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Bones",
                "barType": -1
            }),
        new ArcadeBonusBase(41, <ArcadeBonusModel>{
                "effect": "+{% Equinox Fill Rate",
                "x1": 0.75,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Fill Rate",
                "barType": -1
            }),
        new ArcadeBonusBase(42, <ArcadeBonusModel>{
                "effect": "+{% Monument AFK",
                "x1": 0.5,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% AFK",
                "barType": -1
            }),
        new ArcadeBonusBase(43, <ArcadeBonusModel>{
                "effect": "+{% Sigil Speed",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Speed",
                "barType": -1
            }),
        new ArcadeBonusBase(44, <ArcadeBonusModel>{
                "effect": "+{% Construction Build",
                "x1": 2,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Build Rate",
                "barType": -1
            }),
        new ArcadeBonusBase(45, <ArcadeBonusModel>{
                "effect": "+{% Burger",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Burger",
                "barType": -1
            }),
        new ArcadeBonusBase(46, <ArcadeBonusModel>{
                "effect": "+{% Total Damage",
                "x1": 2,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Damage",
                "barType": -1
            }),
        new ArcadeBonusBase(47, <ArcadeBonusModel>{
                "effect": "+{% Windwalker Dust",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Dust",
                "barType": -1
            }),
        new ArcadeBonusBase(48, <ArcadeBonusModel>{
                "effect": "+{% Medallion Chance",
                "x1": 0.5,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Chance",
                "barType": -1
            }),
        new ArcadeBonusBase(49, <ArcadeBonusModel>{
                "effect": "+{% Breedability Rate",
                "x1": 100,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Breed Rate",
                "barType": -1
            }),
        new ArcadeBonusBase(50, <ArcadeBonusModel>{
                "effect": "+{% Arcane Tachyons",
                "x1": 1,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Tachyons",
                "barType": 17
            }),
        new ArcadeBonusBase(51, <ArcadeBonusModel>{
                "effect": "+{% Emperor Bonuses",
                "x1": 0.2,
                "x2": 0,
                "func": "add",
                "type": "%",
                "lvlUpText": "+{% Bonus",
                "barType": 42
            }),
        new ArcadeBonusBase(52, <ArcadeBonusModel>{
                "effect": "+{% Sneaking XP multi",
                "x1": 100,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% XP multi",
                "barType": 29
            }),
        new ArcadeBonusBase(53, <ArcadeBonusModel>{
                "effect": "+{% Summon XP multi",
                "x1": 100,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% XP multi",
                "barType": 23
            }),
        new ArcadeBonusBase(54, <ArcadeBonusModel>{
                "effect": "+{% Prisma Bonuses",
                "x1": 10,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Bonus",
                "barType": 21
            }),
        new ArcadeBonusBase(55, <ArcadeBonusModel>{
                "effect": "+{% Spelunking Amber",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Amber",
                "barType": 28
            }),
        new ArcadeBonusBase(56, <ArcadeBonusModel>{
                "effect": "+{% Spelunk XP multi",
                "x1": 30,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% XP multi",
                "barType": 39
            }),
        new ArcadeBonusBase(57, <ArcadeBonusModel>{
                "effect": "+{% Daily Coral",
                "x1": 10,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Coral",
                "barType": 41
            }),
        new ArcadeBonusBase(58, <ArcadeBonusModel>{
                "effect": "+{% Palette Luck",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Luck",
                "barType": 42
            }),
        new ArcadeBonusBase(59, <ArcadeBonusModel>{
                "effect": "+{% Meritocracy Bonus",
                "x1": 10,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Bonus",
                "barType": 31
            }),
        new ArcadeBonusBase(60, <ArcadeBonusModel>{
                "effect": "+{% Class XP multi",
                "x1": 50,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% XP multi",
                "barType": 31
            }),
        new ArcadeBonusBase(61, <ArcadeBonusModel>{
                "effect": "+{% Kruk Bubble LVs",
                "x1": 40,
                "x2": 100,
                "func": "decay",
                "type": "%",
                "lvlUpText": "+{% Bubble LV",
                "barType": 22
            })    
]
}
