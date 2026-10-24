import { CookingMasteryUpgradeModel } from '../model/cookingMasteryUpgradeModel';

export class CookingMasteryUpgradeBase { constructor(public index: number, public data: CookingMasteryUpgradeModel) { } }



export const initCookingMasteryRepo = () => {
    return [    
        new CookingMasteryUpgradeBase(0, <CookingMasteryUpgradeModel>{
                "index": 0,
                "name": "SALTY",
                "bonusPerLevel": 200,
                "requiredMasteryLevel": 0,
                "description": "Boosts your Cooking Mastery EXP gains by +{% per POW 10 Ladles you've ever used, which is currently $ ladles used. @   @ Total Bonus:+^% EXP gains @   @ Based on all your upgrades, your total Cooking Mastery EXP rate is &/hr. It's also shown there on the right, see it?"
            }),
        new CookingMasteryUpgradeBase(1, <CookingMasteryUpgradeModel>{
                "index": 1,
                "name": "SPICY",
                "bonusPerLevel": 1,
                "requiredMasteryLevel": 1,
                "description": "Boosts your Cooking Mastery EXP gains by +{% per Cooking LV of your entire Account above 1000, which is currently LV $. @   @ Keep in mind each of these upgrades is multiplicative. @   @ Total Bonus:+^% EXP gains"
            }),
        new CookingMasteryUpgradeBase(2, <CookingMasteryUpgradeModel>{
                "index": 2,
                "name": "SWEET",
                "bonusPerLevel": 30,
                "requiredMasteryLevel": 5,
                "description": "Boosts your Cooking Mastery EXP gains by +{% per level of your Divorce Cake meal above Lv.75. @ So yea, you need at least Lv 76 Divorce Cake... yours is Lv $ @  @   @ Total Bonus:+^% EXP gains"
            }),
        new CookingMasteryUpgradeBase(3, <CookingMasteryUpgradeModel>{
                "index": 3,
                "name": "SMOKY",
                "bonusPerLevel": 10,
                "requiredMasteryLevel": 10,
                "description": "When gaining daily ribbons, there's an extra +$% chance they are +1 rank higher than they otherwise would've been. @   @ As normal in IdleOn, 150% here would mean you're guaranteed +1 Rank and have a 50% chance at +2 Ranks."
            }),
        new CookingMasteryUpgradeBase(4, <CookingMasteryUpgradeModel>{
                "index": 4,
                "name": "SOUR",
                "bonusPerLevel": 2,
                "requiredMasteryLevel": 25,
                "description": "Boosts your Cooking Mastery EXP gains by +{% per total Rank of all your Ribbons across all meals, which is currently $. @   @ Total Bonus:+^% EXP gains"
            }),
        new CookingMasteryUpgradeBase(5, <CookingMasteryUpgradeModel>{
                "index": 5,
                "name": "SAVORY",
                "bonusPerLevel": 20,
                "requiredMasteryLevel": 100,
                "description": "Boosts your Cooking Mastery EXP gains by +{% per Cooking Mastery Rank you are. @   @ You're currently Rank $ @   @ Total Bonus:+^% Exp gains"
            })    
]
}
