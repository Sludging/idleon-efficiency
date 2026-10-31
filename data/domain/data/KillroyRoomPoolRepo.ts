import { KillroyRoomPoolModel } from '../model/killroyRoomPoolModel';

export class KillroyRoomPoolBase { constructor(public index: number, public data: KillroyRoomPoolModel) { } }



export const initKillroyRoomPoolRepo = () => {
    return [    
        new KillroyRoomPoolBase(0, <KillroyRoomPoolModel>{
                "poolId": 68,
                "sceneKeys": [
                    "GrasslandsA",
                    "GrasslandsB",
                    "SewerA",
                    "TreeInteriorA",
                    "GrasslandsC",
                    "SewerB",
                    "JungleA",
                    "GrasslandsD",
                    "TreeInteriorB",
                    "JungleB",
                    "JungleC",
                    "ForestA",
                    "ForestB",
                    "ForestC",
                    "TreeInteriorC"
                ]
            }),
        new KillroyRoomPoolBase(1, <KillroyRoomPoolModel>{
                "poolId": 69,
                "sceneKeys": [
                    "zDesertCalmA",
                    "zDesertCalmB",
                    "zDesertCalmC",
                    "zDesertMildA",
                    "zDesertMildB",
                    "zDesertMildC",
                    "zDesertMildD",
                    "zDesertNightA",
                    "zDesertNightB",
                    "zDesertNightC",
                    "zDesertNightD"
                ]
            }),
        new KillroyRoomPoolBase(2, <KillroyRoomPoolModel>{
                "poolId": 70,
                "sceneKeys": [
                    "ySnowA1",
                    "ySnowA2",
                    "ySnowA3",
                    "ySnowB1",
                    "ySnowB2",
                    "ySnowB3",
                    "ySnowB4",
                    "ySnowB5",
                    "ySnowC1",
                    "ySnowC2",
                    "ySnowC3",
                    "ySnowC4",
                    "ySnowD1"
                ]
            }),
        new KillroyRoomPoolBase(3, <KillroyRoomPoolModel>{
                "poolId": 71,
                "sceneKeys": [
                    "xSpaceA1",
                    "xSpaceA2",
                    "xSpaceA3",
                    "xSpaceA4",
                    "xSpaceB1",
                    "xSpaceB2",
                    "xSpaceB3",
                    "xSpaceB4",
                    "xSpaceB5",
                    "xSpaceC1",
                    "xSpaceC2",
                    "xSpaceC3",
                    "xSpaceC4"
                ]
            }),
        new KillroyRoomPoolBase(4, <KillroyRoomPoolModel>{
                "poolId": 72,
                "sceneKeys": [
                    "wLavaA1",
                    "wLavaA2",
                    "wLavaA3",
                    "wLavaA4",
                    "wLavaA5",
                    "wLavaB1",
                    "wLavaB2",
                    "wLavaB3",
                    "wLavaB4",
                    "wLavaB5",
                    "wLavaB6",
                    "wLavaC1",
                    "wLavaC2"
                ]
            }),
        new KillroyRoomPoolBase(5, <KillroyRoomPoolModel>{
                "poolId": 99,
                "sceneKeys": [
                    "vSpiritA1",
                    "vSpiritA2",
                    "vSpiritA3",
                    "vSpiritA4",
                    "vSpiritA5",
                    "vSpiritB1",
                    "vSpiritB2",
                    "vSpiritB3",
                    "vSpiritB4",
                    "vSpiritC1",
                    "vSpiritC2",
                    "vSpiritD1",
                    "vSpiritD2",
                    "vSpiritD3"
                ]
            })    
]
}
