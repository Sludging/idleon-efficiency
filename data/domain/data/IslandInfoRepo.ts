import { IslandInfoModel } from '../model/islandInfoModel';

export class IslandInfoBase { constructor(public index: number, public data: IslandInfoModel) { } }



export const initIslandInfoRepo = () => {
    return [    
        new IslandInfoBase(0, <IslandInfoModel>{
                "name": "Safari Island",
                "distance": 25,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 10,
                "cloudsUnlocked": 1.2,
                "xYPointer": "0,0",
                "expPerTrip": 2
            }),
        new IslandInfoBase(1, <IslandInfoModel>{
                "name": "Beachy Coast",
                "distance": 100,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 200,
                "cloudsUnlocked": 3.5,
                "xYPointer": "43,304",
                "expPerTrip": 6
            }),
        new IslandInfoBase(2, <IslandInfoModel>{
                "name": "Isolated Woods",
                "distance": 250,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 800,
                "cloudsUnlocked": -1,
                "xYPointer": "398,206",
                "expPerTrip": 10
            }),
        new IslandInfoBase(3, <IslandInfoModel>{
                "name": "Rocky Peaks",
                "distance": 1000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 6000,
                "cloudsUnlocked": 5,
                "xYPointer": "271,340",
                "expPerTrip": 20
            }),
        new IslandInfoBase(4, <IslandInfoModel>{
                "name": "Stormy North",
                "distance": 3000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 30000,
                "cloudsUnlocked": 1,
                "xYPointer": "426,69",
                "expPerTrip": 30
            }),
        new IslandInfoBase(5, <IslandInfoModel>{
                "name": "Toxic Bay Inc",
                "distance": 10000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 120000,
                "cloudsUnlocked": 7,
                "xYPointer": "190,426",
                "expPerTrip": 55
            }),
        new IslandInfoBase(6, <IslandInfoModel>{
                "name": "Candied Island",
                "distance": 25000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 400000,
                "cloudsUnlocked": 7.8,
                "xYPointer": "479,309",
                "expPerTrip": 85
            }),
        new IslandInfoBase(7, <IslandInfoModel>{
                "name": "Fungi Meadows",
                "distance": 100000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 2000000,
                "cloudsUnlocked": 10,
                "xYPointer": "379,404",
                "expPerTrip": 150
            }),
        new IslandInfoBase(8, <IslandInfoModel>{
                "name": "Cloudy Quay",
                "distance": 300000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 8000000,
                "cloudsUnlocked": 9.11,
                "xYPointer": "625,219",
                "expPerTrip": 300
            }),
        new IslandInfoBase(9, <IslandInfoModel>{
                "name": "Dungeon Cove",
                "distance": 1000000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 30000000,
                "cloudsUnlocked": 12,
                "xYPointer": "635,113",
                "expPerTrip": 600
            }),
        new IslandInfoBase(10, <IslandInfoModel>{
                "name": "Crystal Enclave",
                "distance": 2000000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 60000000,
                "cloudsUnlocked": 1,
                "xYPointer": "542,426",
                "expPerTrip": 900
            }),
        new IslandInfoBase(11, <IslandInfoModel>{
                "name": "Petulent Garage",
                "distance": 5000000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 120000000,
                "cloudsUnlocked": 1,
                "xYPointer": "645,354",
                "expPerTrip": 1500
            }),
        new IslandInfoBase(12, <IslandInfoModel>{
                "name": "Isle of Note",
                "distance": 15000000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 400000000,
                "cloudsUnlocked": 13,
                "xYPointer": "826,74",
                "expPerTrip": 3000
            }),
        new IslandInfoBase(13, <IslandInfoModel>{
                "name": "The Edge",
                "distance": 40000000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 1200000000,
                "cloudsUnlocked": 14,
                "xYPointer": "840,243",
                "expPerTrip": 5000
            }),
        new IslandInfoBase(14, <IslandInfoModel>{
                "name": "Sahara",
                "distance": 100000000,
                "relic1": 0,
                "relic2": -1,
                "relic3": -1,
                "unlockQty": 2000000000,
                "cloudsUnlocked": 1,
                "xYPointer": "764,426",
                "expPerTrip": 10000
            })    
]
}
