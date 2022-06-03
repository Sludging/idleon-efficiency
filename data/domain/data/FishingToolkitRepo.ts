import { FishingToolkitModel } from '../model/fishingToolkitModel';

export class FishingToolkitBase { constructor(public id: string, public data: FishingToolkitModel) { } }



export const initFishingToolkitRepo = () => {
    return [    
        new FishingToolkitBase("Weight0", <FishingToolkitModel>{
                "name": "Fly",
                "depth1": 2,
                "depth2": 1,
                "depth3": 0,
                "depth4": 0,
                "fishingExp": 0,
                "fishingSpeed": 0,
                "fishingPower": 0
            }),
        new FishingToolkitBase("Weight1", <FishingToolkitModel>{
                "name": "Wormie",
                "depth1": 0,
                "depth2": 15,
                "depth3": 0,
                "depth4": 0,
                "fishingExp": 5,
                "fishingSpeed": 0,
                "fishingPower": 0
            }),
        new FishingToolkitBase("Weight2", <FishingToolkitModel>{
                "name": "Iron Hook",
                "depth1": 3,
                "depth2": 2,
                "depth3": 0,
                "depth4": 0,
                "fishingExp": 0,
                "fishingSpeed": 3,
                "fishingPower": 1
            }),
        new FishingToolkitBase("Weight3", <FishingToolkitModel>{
                "name": "Basic Bobber",
                "depth1": 0,
                "depth2": 3,
                "depth3": 3,
                "depth4": 0,
                "fishingExp": 4,
                "fishingSpeed": 4,
                "fishingPower": 1
            }),
        new FishingToolkitBase("Weight4", <FishingToolkitModel>{
                "name": "Dualhook Prongs",
                "depth1": 0,
                "depth2": 0,
                "depth3": 4,
                "depth4": 4,
                "fishingExp": 0,
                "fishingSpeed": 8,
                "fishingPower": 3
            }),
        new FishingToolkitBase("Weight5", <FishingToolkitModel>{
                "name": "Pound of Steel",
                "depth1": 0,
                "depth2": 0,
                "depth3": 0,
                "depth4": 30,
                "fishingExp": 2,
                "fishingSpeed": 2,
                "fishingPower": 0
            }),
        new FishingToolkitBase("Weight6", <FishingToolkitModel>{
                "name": "Pound of Feathers",
                "depth1": 0,
                "depth2": 0,
                "depth3": 35,
                "depth4": 10,
                "fishingExp": 0,
                "fishingSpeed": 5,
                "fishingPower": 0
            }),
        new FishingToolkitBase("Weight7", <FishingToolkitModel>{
                "name": "Massless Unit",
                "depth1": 20,
                "depth2": 0,
                "depth3": 0,
                "depth4": 0,
                "fishingExp": 10,
                "fishingSpeed": 0,
                "fishingPower": 0
            }),
        new FishingToolkitBase("Weight8", <FishingToolkitModel>{
                "name": "Literal Elephant",
                "depth1": 0,
                "depth2": 0,
                "depth3": 20,
                "depth4": 60,
                "fishingExp": 0,
                "fishingSpeed": 0,
                "fishingPower": 6
            }),
        new FishingToolkitBase("Weight9", <FishingToolkitModel>{
                "name": "Valve Circles",
                "depth1": 0,
                "depth2": 0,
                "depth3": 0,
                "depth4": 40,
                "fishingExp": 5,
                "fishingSpeed": 10,
                "fishingPower": 5
            }),
        new FishingToolkitBase("Weight10", <FishingToolkitModel>{
                "name": "Dynamite",
                "depth1": 0,
                "depth2": 0,
                "depth3": 10,
                "depth4": 20,
                "fishingExp": 0,
                "fishingSpeed": 0,
                "fishingPower": 2
            }),
        new FishingToolkitBase("Weight11", <FishingToolkitModel>{
                "name": "Not Dynamite",
                "depth1": 12,
                "depth2": 12,
                "depth3": 0,
                "depth4": 0,
                "fishingExp": 0,
                "fishingSpeed": 0,
                "fishingPower": 4
            }),
        new FishingToolkitBase("Weight12", <FishingToolkitModel>{
                "name": "Triple Threat",
                "depth1": 0,
                "depth2": 0,
                "depth3": 0,
                "depth4": 0,
                "fishingExp": 6,
                "fishingSpeed": 6,
                "fishingPower": 6
            }),
        new FishingToolkitBase("Weight13", <FishingToolkitModel>{
                "name": "Crash Box",
                "depth1": 0,
                "depth2": 0,
                "depth3": 0,
                "depth4": 11,
                "fishingExp": 0,
                "fishingSpeed": 12,
                "fishingPower": 5
            }),
        new FishingToolkitBase("Weight14", <FishingToolkitModel>{
                "name": "Fat Albert",
                "depth1": 0,
                "depth2": 0,
                "depth3": 0,
                "depth4": 0,
                "fishingExp": 10,
                "fishingSpeed": 0,
                "fishingPower": 19
            }),
        new FishingToolkitBase("Line0", <FishingToolkitModel>{
                "name": "Fishing Twine",
                "depth1": 0,
                "depth2": 3,
                "depth3": 0,
                "depth4": 0,
                "fishingExp": 0,
                "fishingSpeed": 0,
                "fishingPower": 0
            }),
        new FishingToolkitBase("Line1", <FishingToolkitModel>{
                "name": "Copper Twine",
                "depth1": 0,
                "depth2": 3,
                "depth3": 5,
                "depth4": 0,
                "fishingExp": 0,
                "fishingSpeed": 3,
                "fishingPower": 0
            }),
        new FishingToolkitBase("Line2", <FishingToolkitModel>{
                "name": "Silver Twine",
                "depth1": 0,
                "depth2": 0,
                "depth3": 20,
                "depth4": 0,
                "fishingExp": 15,
                "fishingSpeed": 0,
                "fishingPower": 0
            }),
        new FishingToolkitBase("Line3", <FishingToolkitModel>{
                "name": "Gold Twine",
                "depth1": 0,
                "depth2": 0,
                "depth3": 8,
                "depth4": 20,
                "fishingExp": 22,
                "fishingSpeed": 6,
                "fishingPower": 2
            }),
        new FishingToolkitBase("Line4", <FishingToolkitModel>{
                "name": "Platinum Twine",
                "depth1": 0,
                "depth2": 0,
                "depth3": 30,
                "depth4": 30,
                "fishingExp": 35,
                "fishingSpeed": 12,
                "fishingPower": 5
            }),
        new FishingToolkitBase("Line5", <FishingToolkitModel>{
                "name": "Leafy Vines",
                "depth1": 0,
                "depth2": 0,
                "depth3": 10,
                "depth4": 0,
                "fishingExp": 0,
                "fishingSpeed": 0,
                "fishingPower": 2
            }),
        new FishingToolkitBase("Line6", <FishingToolkitModel>{
                "name": "Fun Flags",
                "depth1": 0,
                "depth2": 0,
                "depth3": 8,
                "depth4": 8,
                "fishingExp": 0,
                "fishingSpeed": 1,
                "fishingPower": 3
            }),
        new FishingToolkitBase("Line7", <FishingToolkitModel>{
                "name": "Electrical Wire",
                "depth1": 0,
                "depth2": 0,
                "depth3": 5,
                "depth4": 20,
                "fishingExp": 0,
                "fishingSpeed": 2,
                "fishingPower": 5
            }),
        new FishingToolkitBase("Line8", <FishingToolkitModel>{
                "name": "Wiener Links",
                "depth1": 0,
                "depth2": 0,
                "depth3": 17,
                "depth4": 5,
                "fishingExp": 0,
                "fishingSpeed": 3,
                "fishingPower": 10
            }),
        new FishingToolkitBase("Line9", <FishingToolkitModel>{
                "name": "Zeus Gon Fishin",
                "depth1": 0,
                "depth2": 0,
                "depth3": 0,
                "depth4": 30,
                "fishingExp": 0,
                "fishingSpeed": 5,
                "fishingPower": 20
            }),
        new FishingToolkitBase("Line10", <FishingToolkitModel>{
                "name": "Needledrop",
                "depth1": 0,
                "depth2": 0,
                "depth3": 5,
                "depth4": 10,
                "fishingExp": 5,
                "fishingSpeed": 0,
                "fishingPower": 0
            }),
        new FishingToolkitBase("Line11", <FishingToolkitModel>{
                "name": "Spoons Lol",
                "depth1": 0,
                "depth2": 0,
                "depth3": 0,
                "depth4": 15,
                "fishingExp": 9,
                "fishingSpeed": 2,
                "fishingPower": 1
            }),
        new FishingToolkitBase("Line12", <FishingToolkitModel>{
                "name": "Its a Boy",
                "depth1": 0,
                "depth2": 0,
                "depth3": 0,
                "depth4": 0,
                "fishingExp": 0,
                "fishingSpeed": 15,
                "fishingPower": 5
            }),
        new FishingToolkitBase("Line13", <FishingToolkitModel>{
                "name": "Its a Girl",
                "depth1": 0,
                "depth2": 0,
                "depth3": 0,
                "depth4": 0,
                "fishingExp": 15,
                "fishingSpeed": 5,
                "fishingPower": 0
            }),
        new FishingToolkitBase("Line14", <FishingToolkitModel>{
                "name": "Its Alright",
                "depth1": 0,
                "depth2": 0,
                "depth3": 0,
                "depth4": 0,
                "fishingExp": 8,
                "fishingSpeed": 8,
                "fishingPower": 8
            })    
]
}
