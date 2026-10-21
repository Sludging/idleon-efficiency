import { MineheadGridSizeModel } from '../model/mineheadGridSizeModel';
import { MineheadMetadataModel } from '../model/mineheadMetadataModel';

export class MineheadMetadataBase { constructor(public index: number, public data: MineheadMetadataModel) { } }



export const initMineheadMetadataRepo = () => {
    return [    
        new MineheadMetadataBase(0, <MineheadMetadataModel>{
                "gridSizesByLevel": [
                    <MineheadGridSizeModel>{"width": 3, "height": 3},
                    <MineheadGridSizeModel>{"width": 4, "height": 3},
                    <MineheadGridSizeModel>{"width": 5, "height": 3},
                    <MineheadGridSizeModel>{"width": 4, "height": 4},
                    <MineheadGridSizeModel>{"width": 6, "height": 3},
                    <MineheadGridSizeModel>{"width": 5, "height": 4},
                    <MineheadGridSizeModel>{"width": 6, "height": 4},
                    <MineheadGridSizeModel>{"width": 7, "height": 4},
                    <MineheadGridSizeModel>{"width": 6, "height": 5},
                    <MineheadGridSizeModel>{"width": 7, "height": 5},
                    <MineheadGridSizeModel>{"width": 8, "height": 5},
                    <MineheadGridSizeModel>{"width": 9, "height": 5},
                    <MineheadGridSizeModel>{"width": 10, "height": 5},
                    <MineheadGridSizeModel>{"width": 9, "height": 6},
                    <MineheadGridSizeModel>{"width": 10, "height": 6},
                    <MineheadGridSizeModel>{"width": 11, "height": 6},
                    <MineheadGridSizeModel>{"width": 12, "height": 6}
                ],
                "damageMultiplierByQuantity": [
                    1,
                    1.2,
                    1.4,
                    1.6,
                    2,
                    3,
                    4,
                    5,
                    6,
                    7,
                    8,
                    8,
                    8,
                    8
                ],
                "additivePercentByQuantity": [
                    0,
                    10,
                    20,
                    50,
                    100,
                    200,
                    500,
                    1000,
                    2000,
                    5000,
                    10000
                ]
            })    
]
}
