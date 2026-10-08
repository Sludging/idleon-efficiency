import { JellyBoardModel } from '../model/jellyBoardModel';
import { JellyObstructionSlotGrantModel } from '../model/jellyObstructionSlotGrantModel';
import { JellyOperationMetadataModel } from '../model/jellyOperationMetadataModel';
import { JellyPlotModel } from '../model/jellyPlotModel';

export class JellyOperationMetadataBase { constructor(public index: number, public data: JellyOperationMetadataModel) { } }



export const initJellyOperationMetadataRepo = () => {
    return [    
        new JellyOperationMetadataBase(0, <JellyOperationMetadataModel>{
                "initialObstructionHp": {
                    "0": 100,
                    "1": 200,
                    "2": 400,
                    "3": 1000,
                    "4": 2000,
                    "5": 4000,
                    "6": 6000,
                    "7": 10000,
                    "8": 15000,
                    "9": 30000,
                    "10": 50000,
                    "11": 100000
                },
                "board": <JellyBoardModel>{
                    "columns": 18,
                    "rows": 10,
                    "initialSlots": [77, 95, 78, 96],
                    "blockedSlots": [
                        61,
                        62,
                        63,
                        64,
                        79,
                        80,
                        81,
                        82,
                        97,
                        98,
                        99,
                        100,
                        115,
                        116,
                        117,
                        118
                    ],
                    "obstructionSlotGrants": [
                        <JellyObstructionSlotGrantModel>{"obstructionIndex": 0, "slots": [76, 94]},
                        <JellyObstructionSlotGrantModel>{"obstructionIndex": 1, "slots": [75, 93]}
                    ],
                    "plots": [
                        <JellyPlotModel>{"index": 0, "startSlot": 0, "width": 5, "height": 1},
                        <JellyPlotModel>{"index": 1, "startSlot": 5, "width": 4, "height": 1},
                        <JellyPlotModel>{"index": 2, "startSlot": 9, "width": 4, "height": 1},
                        <JellyPlotModel>{"index": 3, "startSlot": 13, "width": 3, "height": 1},
                        <JellyPlotModel>{"index": 4, "startSlot": 16, "width": 2, "height": 1},
                        <JellyPlotModel>{"index": 5, "startSlot": 18, "width": 5, "height": 1},
                        <JellyPlotModel>{"index": 6, "startSlot": 23, "width": 4, "height": 1},
                        <JellyPlotModel>{"index": 7, "startSlot": 27, "width": 4, "height": 1},
                        <JellyPlotModel>{"index": 8, "startSlot": 31, "width": 3, "height": 1},
                        <JellyPlotModel>{"index": 9, "startSlot": 34, "width": 2, "height": 1},
                        <JellyPlotModel>{"index": 10, "startSlot": 36, "width": 5, "height": 1},
                        <JellyPlotModel>{"index": 11, "startSlot": 41, "width": 4, "height": 1},
                        <JellyPlotModel>{"index": 12, "startSlot": 45, "width": 4, "height": 1},
                        <JellyPlotModel>{"index": 13, "startSlot": 49, "width": 3, "height": 1},
                        <JellyPlotModel>{"index": 14, "startSlot": 52, "width": 2, "height": 1},
                        <JellyPlotModel>{"index": 15, "startSlot": 54, "width": 7, "height": 1},
                        <JellyPlotModel>{"index": 16, "startSlot": 65, "width": 2, "height": 1},
                        <JellyPlotModel>{"index": 17, "startSlot": 67, "width": 1, "height": 4},
                        <JellyPlotModel>{"index": 18, "startSlot": 68, "width": 4, "height": 1},
                        <JellyPlotModel>{"index": 19, "startSlot": 72, "width": 3, "height": 2},
                        <JellyPlotModel>{"index": 20, "startSlot": 83, "width": 2, "height": 2},
                        <JellyPlotModel>{"index": 21, "startSlot": 86, "width": 2, "height": 2},
                        <JellyPlotModel>{"index": 22, "startSlot": 88, "width": 2, "height": 1},
                        <JellyPlotModel>{"index": 23, "startSlot": 106, "width": 2, "height": 1},
                        <JellyPlotModel>{"index": 24, "startSlot": 108, "width": 7, "height": 1},
                        <JellyPlotModel>{"index": 25, "startSlot": 119, "width": 2, "height": 1},
                        <JellyPlotModel>{"index": 26, "startSlot": 122, "width": 4, "height": 1},
                        <JellyPlotModel>{"index": 27, "startSlot": 126, "width": 5, "height": 1},
                        <JellyPlotModel>{"index": 28, "startSlot": 131, "width": 5, "height": 1},
                        <JellyPlotModel>{"index": 29, "startSlot": 136, "width": 4, "height": 1},
                        <JellyPlotModel>{"index": 30, "startSlot": 140, "width": 1, "height": 3},
                        <JellyPlotModel>{"index": 31, "startSlot": 141, "width": 1, "height": 3},
                        <JellyPlotModel>{"index": 32, "startSlot": 142, "width": 1, "height": 3},
                        <JellyPlotModel>{"index": 33, "startSlot": 143, "width": 1, "height": 3},
                        <JellyPlotModel>{"index": 34, "startSlot": 144, "width": 5, "height": 1},
                        <JellyPlotModel>{"index": 35, "startSlot": 149, "width": 5, "height": 1},
                        <JellyPlotModel>{"index": 36, "startSlot": 154, "width": 4, "height": 1},
                        <JellyPlotModel>{"index": 37, "startSlot": 162, "width": 5, "height": 1},
                        <JellyPlotModel>{"index": 38, "startSlot": 167, "width": 5, "height": 1},
                        <JellyPlotModel>{"index": 39, "startSlot": 172, "width": 4, "height": 1}
                    ]
                }
            })    
]
}
