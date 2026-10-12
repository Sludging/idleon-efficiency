import { ShimmerChallengeModel } from '../model/shimmerChallengeModel';

export class ShimmerChallengeBase { constructor(public index: number, public data: ShimmerChallengeModel) { } }



export const initShimmerChallengeRepo = () => {
    return [    
        new ShimmerChallengeBase(0, <ShimmerChallengeModel>{
                "description": "Get as much total stats as possible, STR AGI WIS and LUK combined.",
                "threshold": 50000
            }),
        new ShimmerChallengeBase(1, <ShimmerChallengeModel>{"description": "Get as much STR stat as you can.", "threshold": 15000}),
        new ShimmerChallengeBase(2, <ShimmerChallengeModel>{"description": "Get as much AGI stat as you can.", "threshold": 15000}),
        new ShimmerChallengeBase(3, <ShimmerChallengeModel>{"description": "Get as much WIS stat as you can.", "threshold": 15000}),
        new ShimmerChallengeBase(4, <ShimmerChallengeModel>{"description": "Get as much LUK stat as you can.", "threshold": 15000}),
        new ShimmerChallengeBase(5, <ShimmerChallengeModel>{
                "description": "Get the highest DPS (number of digits) you can, but on a beginner",
                "threshold": 14
            }),
        new ShimmerChallengeBase(6, <ShimmerChallengeModel>{
                "description": "Get the highest DPS (number of digits) you can, but on a warrior.",
                "threshold": 18
            }),
        new ShimmerChallengeBase(7, <ShimmerChallengeModel>{
                "description": "Get the highest DPS (number of digits) you can, but on a archer.",
                "threshold": 18
            }),
        new ShimmerChallengeBase(8, <ShimmerChallengeModel>{
                "description": "Get the highest DPS (number of digits) you can, but on a mage.",
                "threshold": 20
            }),
        new ShimmerChallengeBase(9, <ShimmerChallengeModel>{"description": "Get the highest Accuracy stat you can.", "threshold": 5000000}),
        new ShimmerChallengeBase(10, <ShimmerChallengeModel>{
                "description": "Get the highest Defence stat. Tank mains, it's your moment!",
                "threshold": 20000
            }),
        new ShimmerChallengeBase(11, <ShimmerChallengeModel>{"description": "Get the highest Movement Speed you can.", "threshold": 500}),
        new ShimmerChallengeBase(12, <ShimmerChallengeModel>{"description": "Get the highest Critical Chance % you can.", "threshold": 250}),
        new ShimmerChallengeBase(13, <ShimmerChallengeModel>{"description": "Spawn as many Giant Mobs this week as you can.", "threshold": 25}),
        new ShimmerChallengeBase(14, <ShimmerChallengeModel>{"description": "Get the highest Max HP as possible.", "threshold": 1500000}),
        new ShimmerChallengeBase(15, <ShimmerChallengeModel>{"description": "Get the highest Max MP as possible.", "threshold": 1500000}),
        new ShimmerChallengeBase(16, <ShimmerChallengeModel>{
                "description": "Get as many individual hits on the DPS Dummy as you can within the timer.",
                "threshold": 240
            }),
        new ShimmerChallengeBase(17, <ShimmerChallengeModel>{
                "description": "Get as much Mining Efficiency (number of digits) as you can.",
                "threshold": 12
            }),
        new ShimmerChallengeBase(18, <ShimmerChallengeModel>{
                "description": "Get as much Choppin Efficiency (number of digits) as you can.",
                "threshold": 11
            }),
        new ShimmerChallengeBase(19, <ShimmerChallengeModel>{
                "description": "Get as much Fishing Efficiency (number of digits) as you can.",
                "threshold": 9
            }),
        new ShimmerChallengeBase(20, <ShimmerChallengeModel>{
                "description": "Get as much Catching Efficiency (number of digits) as you can.",
                "threshold": 10
            }),
        new ShimmerChallengeBase(21, <ShimmerChallengeModel>{"description": "Claim as much Guild GP this week as you can.", "threshold": 600})    
]
}
