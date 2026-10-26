import { TrashIslandRewardModel } from '../model/trashIslandRewardModel';

export class TrashIslandRewardBase { constructor(public index: number, public data: TrashIslandRewardModel) { } }



export const initTrashIslandRewardRepo = () => {
    return [    
        new TrashIslandRewardBase(0, <TrashIslandRewardModel>{
                "index": 0,
                "baseCost": 20,
                "costGrowth": undefined,
                "itemId": "StampB47",
                "bookPayload": undefined
            }),
        new TrashIslandRewardBase(1, <TrashIslandRewardModel>{
                "index": 1,
                "baseCost": 40,
                "costGrowth": undefined,
                "itemId": "StampB32",
                "bookPayload": undefined
            }),
        new TrashIslandRewardBase(2, <TrashIslandRewardModel>{
                "index": 2,
                "baseCost": 80,
                "costGrowth": undefined,
                "itemId": "StampA38",
                "bookPayload": undefined
            }),
        new TrashIslandRewardBase(3, <TrashIslandRewardModel>{
                "index": 3,
                "baseCost": 300,
                "costGrowth": undefined,
                "itemId": "StampA39",
                "bookPayload": undefined
            }),
        new TrashIslandRewardBase(4, <TrashIslandRewardModel>{
                "index": 4,
                "baseCost": 7,
                "costGrowth": 1.4,
                "itemId": undefined,
                "bookPayload": undefined
            }),
        new TrashIslandRewardBase(5, <TrashIslandRewardModel>{
                "index": 5,
                "baseCost": 135,
                "costGrowth": undefined,
                "itemId": undefined,
                "bookPayload": undefined
            }),
        new TrashIslandRewardBase(6, <TrashIslandRewardModel>{
                "index": 6,
                "baseCost": 25,
                "costGrowth": 1.5,
                "itemId": undefined,
                "bookPayload": undefined
            }),
        new TrashIslandRewardBase(7, <TrashIslandRewardModel>{
                "index": 7,
                "baseCost": 450,
                "costGrowth": undefined,
                "itemId": "TalentBook1",
                "bookPayload": 3649200
            }),
        new TrashIslandRewardBase(8, <TrashIslandRewardModel>{
                "index": 8,
                "baseCost": 1500,
                "costGrowth": undefined,
                "itemId": "EquipmentNametag6b",
                "bookPayload": undefined
            })    
]
}
