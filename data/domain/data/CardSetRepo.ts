import { CardSetModel } from '../model/cardSetModel';

export class CardSetBase { constructor(public index: number, public data: CardSetModel) { } }



export const initCardSetRepo = () => {
    return [    
        new CardSetBase(0, <CardSetModel>{"bonus": "{% EXP if below Lv 50", "displayName":"Blunder Hills", "scaling": 8, "image": "CardSet0"}),
        new CardSetBase(1, <CardSetModel>{"bonus": "{% All Food Effect", "displayName":"Yum Yum Desert", "scaling": 10, "image": "CardSet1"}),
        new CardSetBase(2, <CardSetModel>{"bonus": "{% Skill Efficiency", "displayName":"Easy Resources", "scaling": 8, "image": "CardSet2"}),
        new CardSetBase(3, <CardSetModel>{"bonus": "{% Skill EXP Gain", "displayName":"Medium Resources", "scaling": 5, "image": "CardSet3"}),
        new CardSetBase(4, <CardSetModel>{"bonus": "{% DEF and ACC", "displayName":"Frostbite Tundra", "scaling": 5, "image": "CardSet4"}),
        new CardSetBase(5, <CardSetModel>{"bonus": "{% Skill AFK Gain Rate", "displayName":"Hard Resources", "scaling": 2, "image": "CardSet5"}),
        new CardSetBase(6, <CardSetModel>{"bonus": "{% Crit Chance", "displayName":"Hyperion Nebula", "scaling": 6, "image": "CardSet6"}),
        new CardSetBase(7, <CardSetModel>{"bonus": "{% Fight AFK Gain Rate", "displayName":"Smolderin' Plateau", "scaling": 2, "image": "CardSet8"}),
        new CardSetBase(8, <CardSetModel>{"bonus": "{% more Dungeon Credits", "displayName":"Dungeons", "scaling": 5, "image": "CardSet7"}),
        new CardSetBase(9, <CardSetModel>{"bonus": "{% Dmg, Drop, and EXP", "displayName":"Bosses", "scaling": 6, "image": "CardSet26"}),
        new CardSetBase(10, <CardSetModel>{"bonus": "{% Drop Rate", "scaling": 7, "displayName":"Event", "image": "CardSet25"})/*,
        new CardSetBase(11, <CardSetModel>{"bonus": "{% Drop Rate", "scaling": 5, "displayName":"Event", "image": "CardSet25.png"})*/    
]
}
