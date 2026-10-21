import { CoralReefFishModel } from '../model/coralReefFishModel';

export class CoralReefFishBase { constructor(public index: number, public data: CoralReefFishModel) { } }



export const initCoralReefFishRepo = () => {
    return [    
        new CoralReefFishBase(0, <CoralReefFishModel>{
                "index": 0,
                "x": 241,
                "y": 614,
                "mapId": 301,
                "costCoefficient": 5,
                "costExponent": 3,
                "fishOffsetX": 4,
                "fishOffsetY": 0
            }),
        new CoralReefFishBase(1, <CoralReefFishModel>{
                "index": 1,
                "x": 139,
                "y": 752,
                "mapId": 324,
                "costCoefficient": 5,
                "costExponent": 20,
                "fishOffsetX": 5,
                "fishOffsetY": 0
            }),
        new CoralReefFishBase(2, <CoralReefFishModel>{
                "index": 2,
                "x": 826,
                "y": 732,
                "mapId": 305,
                "costCoefficient": 4,
                "costExponent": 7,
                "fishOffsetX": 0,
                "fishOffsetY": 0
            }),
        new CoralReefFishBase(3, <CoralReefFishModel>{
                "index": 3,
                "x": 1147,
                "y": 454,
                "mapId": 303,
                "costCoefficient": 9,
                "costExponent": 5,
                "fishOffsetX": 3,
                "fishOffsetY": 7
            }),
        new CoralReefFishBase(4, <CoralReefFishModel>{
                "index": 4,
                "x": 450,
                "y": 318,
                "mapId": 311,
                "costCoefficient": 8,
                "costExponent": 11,
                "fishOffsetX": 3,
                "fishOffsetY": 0
            }),
        new CoralReefFishBase(5, <CoralReefFishModel>{
                "index": 5,
                "x": 500,
                "y": 500,
                "mapId": 999,
                "costCoefficient": 5,
                "costExponent": 4,
                "fishOffsetX": 0,
                "fishOffsetY": 0
            }),
        new CoralReefFishBase(6, <CoralReefFishModel>{
                "index": 6,
                "x": 500,
                "y": 500,
                "mapId": 999,
                "costCoefficient": 5,
                "costExponent": 4,
                "fishOffsetX": 0,
                "fishOffsetY": 0
            }),
        new CoralReefFishBase(7, <CoralReefFishModel>{
                "index": 7,
                "x": 500,
                "y": 500,
                "mapId": 999,
                "costCoefficient": 5,
                "costExponent": 4,
                "fishOffsetX": 0,
                "fishOffsetY": 0
            }),
        new CoralReefFishBase(8, <CoralReefFishModel>{
                "index": 8,
                "x": 500,
                "y": 500,
                "mapId": 999,
                "costCoefficient": 5,
                "costExponent": 4,
                "fishOffsetX": 0,
                "fishOffsetY": 0
            }),
        new CoralReefFishBase(9, <CoralReefFishModel>{
                "index": 9,
                "x": 500,
                "y": 500,
                "mapId": 999,
                "costCoefficient": 5,
                "costExponent": 4,
                "fishOffsetX": 0,
                "fishOffsetY": 0
            })    
]
}
