import { ButtonBonusModel } from '../model/buttonBonusModel';

export class ButtonBonusBase { constructor(public index: number, public data: ButtonBonusModel) { } }



export const initButtonBonusRepo = () => {
    return [    
        new ButtonBonusBase(0, <ButtonBonusModel>{"index": 0, "name": "Research XP", "bonusPerPress": 2}),
        new ButtonBonusBase(1, <ButtonBonusModel>{"index": 1, "name": "Minehead Currency", "bonusPerPress": 3}),
        new ButtonBonusBase(2, <ButtonBonusModel>{"index": 2, "name": "Sushi Bucks", "bonusPerPress": 2}),
        new ButtonBonusBase(3, <ButtonBonusModel>{"index": 3, "name": "Artifact Odds", "bonusPerPress": 2}),
        new ButtonBonusBase(4, <ButtonBonusModel>{"index": 4, "name": "Xtra Masterclass Drops", "bonusPerPress": 4}),
        new ButtonBonusBase(5, <ButtonBonusModel>{"index": 5, "name": "Spelunk POW", "bonusPerPress": 5}),
        new ButtonBonusBase(6, <ButtonBonusModel>{"index": 6, "name": "Cooking SPD", "bonusPerPress": 4}),
        new ButtonBonusBase(7, <ButtonBonusModel>{"index": 7, "name": "Crop Evo", "bonusPerPress": 25}),
        new ButtonBonusBase(8, <ButtonBonusModel>{"index": 8, "name": "Class EXP", "bonusPerPress": 5})    
]
}
