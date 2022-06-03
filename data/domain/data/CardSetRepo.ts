import { CardSetModel } from '../model/cardSetModel';

export class CardSetBase { constructor(public index: number, public data: CardSetModel) { } }



export const initCardSetRepo = () => {
    return [    
        new CardSetBase(0, <CardSetModel>{"bonus": "{% EXP if below Lv 50", "scaling": 8, "image": "CardSet0.png"}),
        new CardSetBase(1, <CardSetModel>{"bonus": "{% All Food Effect", "scaling": 10, "image": "CardSet1.png"}),
        new CardSetBase(2, <CardSetModel>{"bonus": "{% Skill Efficiency", "scaling": 8, "image": "CardSet2.png"}),
        new CardSetBase(3, <CardSetModel>{"bonus": "{% Skill EXP Gain", "scaling": 5, "image": "CardSet3.png"}),
        new CardSetBase(4, <CardSetModel>{"bonus": "{% DEF and ACC", "scaling": 5, "image": "CardSet4.png"}),
        new CardSetBase(5, <CardSetModel>{"bonus": "{% Skill AFK Gain Rate", "scaling": 2, "image": "CardSet5.png"}),
        new CardSetBase(6, <CardSetModel>{"bonus": "{% Crit Chance", "scaling": 6, "image": "CardSet6.png"}),
        new CardSetBase(7, <CardSetModel>{"bonus": "{% more Dungeon Credits", "scaling": 5, "image": "CardSet7.png"}),
        new CardSetBase(8, <CardSetModel>{"bonus": "{% Dmg, Drop, and EXP", "scaling": 6, "image": "CardSet26.png"}),
        new CardSetBase(9, <CardSetModel>{"bonus": "{% Drop Rate", "scaling": 5, "image": "CardSet25.png"}),
        new CardSetBase(10, <CardSetModel>{"bonus": "{% Drop Rate", "scaling": 5, "image": "CardSet25.png"}),
        new CardSetBase(11, <CardSetModel>{"bonus": "{% Drop Rate", "scaling": 5, "image": "CardSet25.png"})    
]
}
