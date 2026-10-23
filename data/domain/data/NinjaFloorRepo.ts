import { NinjaFloorDropModel } from '../model/ninjaFloorDropModel';
import { NinjaFloorModel } from '../model/ninjaFloorModel';

export class NinjaFloorBase { constructor(public index: number, public data: NinjaFloorModel) { } }



export const initNinjaFloorRepo = () => {
    return [    
        new NinjaFloorBase(0, <NinjaFloorModel>{
                "floorIndex": 0,
                "baseDoorHp": 1,
                "baseDetectionThreshold": 0.01,
                "baseJadePerAction": 0,
                "baseXpPerAction": 25,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem2", "chance": 0.001},
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem0", "chance": 0.1}
                ]
            }),
        new NinjaFloorBase(1, <NinjaFloorModel>{
                "floorIndex": 1,
                "baseDoorHp": 150,
                "baseDetectionThreshold": 15,
                "baseJadePerAction": 100,
                "baseXpPerAction": 40,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem0", "chance": 0.05},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr0", "chance": 0.2},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr8", "chance": 0.3},
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem1", "chance": 0.05},
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem14", "chance": 0.03},
                    <NinjaFloorDropModel>{"ninjaItem": "NjWep0", "chance": 0.15}
                ]
            }),
        new NinjaFloorBase(2, <NinjaFloorModel>{
                "floorIndex": 2,
                "baseDoorHp": 800,
                "baseDetectionThreshold": 80,
                "baseJadePerAction": 300,
                "baseXpPerAction": 150,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem5", "chance": 0.04},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr15", "chance": 0.15},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr13", "chance": 0.17},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr5", "chance": 0.2},
                    <NinjaFloorDropModel>{"ninjaItem": "NjWep1", "chance": 0.15}
                ]
            }),
        new NinjaFloorBase(3, <NinjaFloorModel>{
                "floorIndex": 3,
                "baseDoorHp": 5000,
                "baseDetectionThreshold": 500,
                "baseJadePerAction": 1500,
                "baseXpPerAction": 1150,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem3", "chance": 0.02},
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem11", "chance": 0.04},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr7", "chance": 0.17},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr9", "chance": 0.2},
                    <NinjaFloorDropModel>{"ninjaItem": "NjWep5", "chance": 0.15}
                ]
            }),
        new NinjaFloorBase(4, <NinjaFloorModel>{
                "floorIndex": 4,
                "baseDoorHp": 25000,
                "baseDetectionThreshold": 2500,
                "baseJadePerAction": 6000,
                "baseXpPerAction": 2000,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem9", "chance": 0.03},
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem10", "chance": 0.01},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr10", "chance": 0.17},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr4", "chance": 0.2},
                    <NinjaFloorDropModel>{"ninjaItem": "NjWep2", "chance": 0.15}
                ]
            }),
        new NinjaFloorBase(5, <NinjaFloorModel>{
                "floorIndex": 5,
                "baseDoorHp": 200000,
                "baseDetectionThreshold": 8000,
                "baseJadePerAction": 17500,
                "baseXpPerAction": 14000,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem12", "chance": 0.04},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr14", "chance": 0.17},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr11", "chance": 0.2},
                    <NinjaFloorDropModel>{"ninjaItem": "NjWep6", "chance": 0.15}
                ]
            }),
        new NinjaFloorBase(6, <NinjaFloorModel>{
                "floorIndex": 6,
                "baseDoorHp": 1500000,
                "baseDetectionThreshold": 40000,
                "baseJadePerAction": 60000,
                "baseXpPerAction": 25000,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem4", "chance": 0.03},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr18", "chance": 0.17},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr1", "chance": 0.2},
                    <NinjaFloorDropModel>{"ninjaItem": "NjWep3", "chance": 0.15}
                ]
            }),
        new NinjaFloorBase(7, <NinjaFloorModel>{
                "floorIndex": 7,
                "baseDoorHp": 20000000,
                "baseDetectionThreshold": 170000,
                "baseJadePerAction": 170000,
                "baseXpPerAction": 170000,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem13", "chance": 0.02},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr2", "chance": 0.17},
                    <NinjaFloorDropModel>{"ninjaItem": "NjGl0", "chance": 0.08},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr6", "chance": 0.2},
                    <NinjaFloorDropModel>{"ninjaItem": "NjWep7", "chance": 0.15}
                ]
            }),
        new NinjaFloorBase(8, <NinjaFloorModel>{
                "floorIndex": 8,
                "baseDoorHp": 100000000,
                "baseDetectionThreshold": 800000,
                "baseJadePerAction": 800000,
                "baseXpPerAction": 200000,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem6", "chance": 0.005},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr12", "chance": 0.17},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr16", "chance": 0.23},
                    <NinjaFloorDropModel>{"ninjaItem": "NjWep4", "chance": 0.15}
                ]
            }),
        new NinjaFloorBase(9, <NinjaFloorModel>{
                "floorIndex": 9,
                "baseDoorHp": 2e+09,
                "baseDetectionThreshold": 3000000,
                "baseJadePerAction": 4000000,
                "baseXpPerAction": 2250000,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem7", "chance": 0.001},
                    <NinjaFloorDropModel>{"ninjaItem": "NjGl1", "chance": 0.05},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr17", "chance": 0.21},
                    <NinjaFloorDropModel>{"ninjaItem": "NjWep8", "chance": 0.15}
                ]
            }),
        new NinjaFloorBase(10, <NinjaFloorModel>{
                "floorIndex": 10,
                "baseDoorHp": 4e+10,
                "baseDetectionThreshold": 10000000,
                "baseJadePerAction": 15000000,
                "baseXpPerAction": 5000000,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem8", "chance": 0.0005},
                    <NinjaFloorDropModel>{"ninjaItem": "NjGl2", "chance": 0.04},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr3", "chance": 0.2}
                ]
            }),
        new NinjaFloorBase(11, <NinjaFloorModel>{
                "floorIndex": 11,
                "baseDoorHp": 4.5e+13,
                "baseDetectionThreshold": 2e+07,
                "baseJadePerAction": 6e+07,
                "baseXpPerAction": 2.5e+07,
                "drops": [
                    <NinjaFloorDropModel>{"ninjaItem": "NjItem2", "chance": 0.0001},
                    <NinjaFloorDropModel>{"ninjaItem": "NjTr19", "chance": 0.2}
                ]
            })    
]
}
