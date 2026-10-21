import { ArenaBonusModel } from '../model/arenaBonusModel';

export class ArenaBonusBase { constructor(public index: number, public data: ArenaBonusModel) { } }



export const initArenaBonusRepo = () => {
    return [    
        new ArenaBonusBase(0, <ArenaBonusModel>{"desc": "Unlocks 3Rd Mob Battle Slot"}),
        new ArenaBonusBase(1, <ArenaBonusModel>{"desc": "+25% Library Vip Membership"}),
        new ArenaBonusBase(2, <ArenaBonusModel>{"desc": "1.20X Total Damage"}),
        new ArenaBonusBase(3, <ArenaBonusModel>{"desc": "New Post Office Upgrade Crate"}),
        new ArenaBonusBase(4, <ArenaBonusModel>{"desc": "Unlocks 4Th Mob Battle Slot"}),
        new ArenaBonusBase(5, <ArenaBonusModel>{"desc": "1.5X Monster Cash"}),
        new ArenaBonusBase(6, <ArenaBonusModel>{"desc": "New Post Office Upgrade Crate"}),
        new ArenaBonusBase(7, <ArenaBonusModel>{"desc": "-50% Kitchen Upgrade Costs"}),
        new ArenaBonusBase(8, <ArenaBonusModel>{"desc": "Unlocks 5Th Mob Battle Slot"}),
        new ArenaBonusBase(9, <ArenaBonusModel>{"desc": "New Post Office Upgrade Crate"}),
        new ArenaBonusBase(10, <ArenaBonusModel>{"desc": "+60% Library Vip Membership"}),
        new ArenaBonusBase(11, <ArenaBonusModel>{"desc": "Can Equip 3Rd Large Bubble"}),
        new ArenaBonusBase(12, <ArenaBonusModel>{"desc": "Unlocks 6Th Mob Battle Slot"}),
        new ArenaBonusBase(13, <ArenaBonusModel>{"desc": "+20% Line Width For All Players"}),
        new ArenaBonusBase(14, <ArenaBonusModel>{"desc": "2X Monster Cash"}),
        new ArenaBonusBase(15, <ArenaBonusModel>{"desc": "1.40X Total Damage"}),
        new ArenaBonusBase(16, <ArenaBonusModel>{"desc": "1.25X Grey Dna From Trashing"}),
        new ArenaBonusBase(17, <ArenaBonusModel>{"desc": "5X Orion Feather Gains"}),
        new ArenaBonusBase(18, <ArenaBonusModel>{"desc": "+25% Research Exp Gains"}),
        new ArenaBonusBase(19, <ArenaBonusModel>{"desc": "1.30X Total Spelunking Pow"}),
        new ArenaBonusBase(20, <ArenaBonusModel>{"desc": "+10% Hourly Lumi Gains"}),
        new ArenaBonusBase(21, <ArenaBonusModel>{"desc": "10X Cooking Speed"}),
        new ArenaBonusBase(22, <ArenaBonusModel>{"desc": "1.25X Grey Dna From Trashing"}),
        new ArenaBonusBase(23, <ArenaBonusModel>{"desc": "4X Poppy Fish Gains"}),
        new ArenaBonusBase(24, <ArenaBonusModel>{"desc": "1.50X Total Spelunking Pow"}),
        new ArenaBonusBase(25, <ArenaBonusModel>{"desc": "35% Research Exp Gains"}),
        new ArenaBonusBase(26, <ArenaBonusModel>{"desc": "3X Bubba Meat Gains"}),
        new ArenaBonusBase(27, <ArenaBonusModel>{"desc": "1.25X Grey Dna From Trashing"}),
        new ArenaBonusBase(28, <ArenaBonusModel>{"desc": "20X Cooking Speed"}),
        new ArenaBonusBase(29, <ArenaBonusModel>{"desc": "1.25X Grey Dna From Trashing"}),
        new ArenaBonusBase(30, <ArenaBonusModel>{"desc": "+25% Hourly Lumi Gains"}),
        new ArenaBonusBase(31, <ArenaBonusModel>{"desc": "1.20X Class Exp"})    
]
}
