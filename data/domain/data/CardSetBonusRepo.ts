import { BonusMapModel } from '../model/bonusMapModel';

export class BonusMapBase { constructor(public index: number, public data: BonusMapModel) { } }



export const initCardSetBonusRepo = () => {
    return [    
        new BonusMapBase(0, <BonusMapModel>{"id": 0, "bonus": "{%_EXP_if_below_Lv_50"}),
        new BonusMapBase(1, <BonusMapModel>{"id": 1, "bonus": "{%_All_Food_Effect"}),
        new BonusMapBase(2, <BonusMapModel>{"id": 2, "bonus": "{%_Skill_Efficiency"}),
        new BonusMapBase(3, <BonusMapModel>{"id": 3, "bonus": "{%_Skill_EXP_Gain"}),
        new BonusMapBase(4, <BonusMapModel>{"id": 4, "bonus": "{%_DEF_and_ACC"}),
        new BonusMapBase(5, <BonusMapModel>{"id": 5, "bonus": "{%_Dmg,_Drop,_and_EXP"}),
        new BonusMapBase(6, <BonusMapModel>{"id": 6, "bonus": "{%_Drop_Rate"}),
        new BonusMapBase(7, <BonusMapModel>{"id": 7, "bonus": "{%_Skill_AFK_Gain_Rate"}),
        new BonusMapBase(8, <BonusMapModel>{"id": 8, "bonus": "{%_more_Dungeon_Credits"}),
        new BonusMapBase(9, <BonusMapModel>{"id": 9, "bonus": "{%_Crit_Chance"}),
        new BonusMapBase(10, <BonusMapModel>{"id": 10, "bonus": "{%_Fight_AFK_Gain_Rate"}),
        new BonusMapBase(11, <BonusMapModel>{"id": 11, "bonus": "{%_Multikill_Per_Tier"})    
]
}
