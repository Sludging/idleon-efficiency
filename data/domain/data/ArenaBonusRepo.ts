import { ArenaBonusModel } from '../model/arenaBonusModel';

export class ArenaBonusBase { constructor(public index: number, public data: ArenaBonusModel) { } }



export const initArenaBonusRepo = () => {
    return [    
        new ArenaBonusBase(0, <ArenaBonusModel>{"desc": "Unlocks 3Rd Pet Battle Slot"}),
        new ArenaBonusBase(1, <ArenaBonusModel>{"desc": "+25% Library Vip Membership"}),
        new ArenaBonusBase(2, <ArenaBonusModel>{"desc": "1.20X Total Damage"}),
        new ArenaBonusBase(3, <ArenaBonusModel>{"desc": "New Post Office Upgrade Crate"}),
        new ArenaBonusBase(4, <ArenaBonusModel>{"desc": "Unlocks 4Th Pet Battle Slot"}),
        new ArenaBonusBase(5, <ArenaBonusModel>{"desc": "1.5X Monster Cash"}),
        new ArenaBonusBase(6, <ArenaBonusModel>{"desc": "New Post Office Upgrade Crate"}),
        new ArenaBonusBase(7, <ArenaBonusModel>{"desc": "-50% Kitchen Upgrade Costs"}),
        new ArenaBonusBase(8, <ArenaBonusModel>{"desc": "Unlocks 5Th Pet Battle Slot"}),
        new ArenaBonusBase(9, <ArenaBonusModel>{"desc": "New Post Office Upgrade Crate"}),
        new ArenaBonusBase(10, <ArenaBonusModel>{"desc": "+60% Library Vip Membership"}),
        new ArenaBonusBase(11, <ArenaBonusModel>{"desc": "Can Equip 3Rd Large Bubble"}),
        new ArenaBonusBase(12, <ArenaBonusModel>{"desc": "Unlocks 6Th Pet Battle Slot"}),
        new ArenaBonusBase(13, <ArenaBonusModel>{"desc": "+20% Line Width For All Players"}),
        new ArenaBonusBase(14, <ArenaBonusModel>{"desc": "2X Monster Cash"}),
        new ArenaBonusBase(15, <ArenaBonusModel>{"desc": "1.40X Total Damage"})    
]
}
