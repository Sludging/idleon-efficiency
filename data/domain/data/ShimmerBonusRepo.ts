import { ShimmerBonusModel } from '../model/shimmerBonusModel';

export class ShimmerBonusBase { constructor(public index: number, public data: ShimmerBonusModel) { } }



export const initShimmerBonusRepo = () => {
    return [    
        new ShimmerBonusBase(0, <ShimmerBonusModel>{"description": "+{,Base STR", "levelDivisor": 12}),
        new ShimmerBonusBase(1, <ShimmerBonusModel>{"description": "+{,Base AGI", "levelDivisor": 12}),
        new ShimmerBonusBase(2, <ShimmerBonusModel>{"description": "+{,Base WIS", "levelDivisor": 12}),
        new ShimmerBonusBase(3, <ShimmerBonusModel>{"description": "+{,Base LUK", "levelDivisor": 10}),
        new ShimmerBonusBase(4, <ShimmerBonusModel>{"description": "+{%,Total DMG", "levelDivisor": 3}),
        new ShimmerBonusBase(5, <ShimmerBonusModel>{"description": "+{%,Class EXP", "levelDivisor": 4}),
        new ShimmerBonusBase(6, <ShimmerBonusModel>{"description": "+{%,Skill Eff", "levelDivisor": 5})    
]
}
