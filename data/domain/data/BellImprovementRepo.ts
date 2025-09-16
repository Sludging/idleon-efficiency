import { BellImprovementModel } from '../model/bellImprovementModel';

export class BellImprovementBase { constructor(public index: number, public data: BellImprovementModel) { } }



export const initBellImprovementRepo = () => {
    return [    
        new BellImprovementBase(0, <BellImprovementModel>{
                "index": 0,
                "baseValue": "15000000000",
                "bonus": "+{% Bell Ring/hr",
                "resource": "Coins"
            }),
        new BellImprovementBase(1, <BellImprovementModel>{
                "index": 1,
                "baseValue": "100",
                "bonus": "+{% Bell Clean/hr",
                "resource": "Mythril"
            }),
        new BellImprovementBase(2, <BellImprovementModel>{
                "index": 2,
                "baseValue": "1000000",
                "bonus": "+{% Bell Ring/hr",
                "resource": "Bits"
            }),
        new BellImprovementBase(3, <BellImprovementModel>{
                "index": 3,
                "baseValue": "300",
                "bonus": "+{% Bell Ping/hr",
                "resource": "Eighth Note"
            }),
        new BellImprovementBase(4, <BellImprovementModel>{"index": 4, "baseValue": "150", "bonus": "+{% Bell Ring/hr", "resource": "Atoms"}),
        new BellImprovementBase(5, <BellImprovementModel>{
                "index": 5,
                "baseValue": "1500",
                "bonus": "+{% Bell Ring/hr",
                "resource": "Turquoise Rupie"
            })    
]
}
