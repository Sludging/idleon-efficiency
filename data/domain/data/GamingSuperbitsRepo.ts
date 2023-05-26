import { GamingSuperbitModel } from '../model/gamingSuperbitModel';

export class GamingSuperbitBase { constructor(public index: number, public data: GamingSuperbitModel) { } }



export const initGamingSuperbitsRepo = () => {
    return [    
        new GamingSuperbitBase(0, <GamingSuperbitModel>{
                "description": "x1.03₣ per Achievement you've unlocked (). Total bonus: x₣",
                "x1": 1,
                "x2": 9,
                "name": "Bits Per Achievement"
            }),
        new GamingSuperbitBase(1, <GamingSuperbitModel>{
                "description": "+1 Max Evolution for all plants. This is 20x rarer than normal evolutions",
                "x1": 3,
                "x2": 10,
                "name": "Plant evo"
            }),
        new GamingSuperbitBase(2, <GamingSuperbitModel>{
                "description": "All obols give +40% more STR/AGI/WIS/LUK than what they say they do!",
                "x1": 2,
                "x2": 12,
                "name": "obol stat booster"
            }),
        new GamingSuperbitBase(3, <GamingSuperbitModel>{
                "description": "MSA now gives +1% bonus Sailing Speed per 10 total Waves",
                "x1": 5,
                "x2": 16,
                "name": "MSA Sailing"
            }),
        new GamingSuperbitBase(4, <GamingSuperbitModel>{
                "description": "+20% chance for +1 more bubble boosted by No Bubble Left Behind",
                "x1": 1,
                "x2": 22,
                "name": "Moar Bubbles"
            }),
        new GamingSuperbitBase(5, <GamingSuperbitModel>{
                "description": "+1 Max Evolution for all plants. This one is 5000x rarer than normal",
                "x1": 3,
                "x2": 44,
                "name": "Plant evo"
            }),
        new GamingSuperbitBase(6, <GamingSuperbitModel>{
                "description": "+5 Max HP for Worship Totem during Tower Defence summon battle",
                "x1": 2,
                "x2": 11,
                "name": "Worship Totem HP"
            }),
        new GamingSuperbitBase(7, <GamingSuperbitModel>{
                "description": "Unlock the Totalizer for the Miniature Soul Apparatus (MSA) in World 3",
                "x1": 5,
                "x2": 13,
                "name": "MSA Totalizer"
            }),
        new GamingSuperbitBase(8, <GamingSuperbitModel>{
                "description": "All shrines level up +50% faster than normal",
                "x1": 5,
                "x2": 14,
                "name": "Shrine Speed"
            }),
        new GamingSuperbitBase(9, <GamingSuperbitModel>{
                "description": "If no Prayers equipped, get 1/5th bonus of all prayers, and no curses",
                "x1": 3,
                "x2": 17,
                "name": "No more Praying"
            }),
        new GamingSuperbitBase(10, <GamingSuperbitModel>{
                "description": "+15% chance for Double Exp whenever claiming AFK gains",
                "x1": 2,
                "x2": 23,
                "name": "Double Exp"
            }),
        new GamingSuperbitBase(11, <GamingSuperbitModel>{
                "description": "MSA now gives +1% bonus Class EXP per 10 total Waves",
                "x1": 4,
                "x2": 38,
                "name": "MSA Class EXP"
            }),
        new GamingSuperbitBase(12, <GamingSuperbitModel>{
                "description": "+1% faster Library Checkout Speed per Gaming Lv. Total Bonus: +{% Spd",
                "x1": 4,
                "x2": 19,
                "name": "Library Checkouts"
            }),
        new GamingSuperbitBase(13, <GamingSuperbitModel>{
                "description": "MSA now gives +10% bonus Meal Cooking speed per 10 total Waves",
                "x1": 2,
                "x2": 20,
                "name": "MSA Mealing"
            }),
        new GamingSuperbitBase(14, <GamingSuperbitModel>{
                "description": "All spice claimed, either manually or automatically, is worth 1.5x more.",
                "x1": 4,
                "x2": 25,
                "name": "Spice Is Nice"
            }),
        new GamingSuperbitBase(15, <GamingSuperbitModel>{
                "description": "+10 Max HP for Worship Totem during Tower Defence summon battle",
                "x1": 4,
                "x2": 31,
                "name": "Worship Totem HPr"
            }),
        new GamingSuperbitBase(16, <GamingSuperbitModel>{
                "description": "MSA now gives +1% bonus Skill Exp per 10 total Waves",
                "x1": 4,
                "x2": 41,
                "name": "MSA Skill EXP"
            }),
        new GamingSuperbitBase(17, <GamingSuperbitModel>{
                "description": "All spice claimed, either manually or automatically, is worth 2x more.",
                "x1": 5,
                "x2": 47,
                "name": "Spice Is Nicer"
            }),
        new GamingSuperbitBase(18, <GamingSuperbitModel>{
                "description": "+1 Max Evolution for all plants. This one is 250x rarer than normal",
                "x1": 2,
                "x2": 27,
                "name": "Plant evo"
            }),
        new GamingSuperbitBase(19, <GamingSuperbitModel>{
                "description": "Your lowest Leveled character gets 1.5x Class EXP",
                "x1": 4,
                "x2": 29,
                "name": "Noobie Gains"
            }),
        new GamingSuperbitBase(20, <GamingSuperbitModel>{
                "description": "MSA now gives +50% Bits for Gaming per 10 total Waves",
                "x1": 5,
                "x2": 33,
                "name": "MSA Big Bits"
            }),
        new GamingSuperbitBase(21, <GamingSuperbitModel>{
                "description": "All atom upgrading is now 10% cheaper",
                "x1": 2,
                "x2": 36,
                "name": "Atom Redux"
            }),
        new GamingSuperbitBase(22, <GamingSuperbitModel>{
                "description": "+30% chance for +1 more bubble boosted by No Bubble Left Behind",
                "x1": 8,
                "x2": 50,
                "name": "Even Moar Bubbles"
            }),
        new GamingSuperbitBase(23, <GamingSuperbitModel>{
                "description": "All atoms now have +10 Max LV",
                "x1": 9,
                "x2": 52,
                "name": "Isotope Discovery"
            })    
]
}
