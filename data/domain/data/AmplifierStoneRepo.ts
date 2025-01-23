import { AmplifierStoneModel } from '../model/amplifierStoneModel';

export class AmplifierStoneBase { constructor(public index: number, public data: AmplifierStoneModel) { } }



export const initAmplifierStoneRepo = () => {
    return [    
        new AmplifierStoneBase(0, <AmplifierStoneModel>{
                "name": "BIGGER BITE",
                "desc": "Hounds now have a base attack value of {",
                "perLvl": 0.11,
                "maxVal": 100
            }),
        new AmplifierStoneBase(1, <AmplifierStoneModel>{
                "name": "ELUSIVE INSTINCT",
                "desc": "Hounds now require { Accuracy for 100% hit chance",
                "perLvl": 0.09,
                "maxVal": 100
            }),
        new AmplifierStoneBase(2, <AmplifierStoneModel>{
                "name": "CANINE RECOVERY",
                "desc": "All hounds now heal {% HP every 3s",
                "perLvl": 0.08,
                "maxVal": 20
            }),
        new AmplifierStoneBase(3, <AmplifierStoneModel>{
                "name": "BIGGER BOW WOW",
                "desc": "Hounds have a 10% chance to spawn BIG with {x HP and DMG",
                "perLvl": 0.1,
                "maxVal": 100
            }),
        new AmplifierStoneBase(4, <AmplifierStoneModel>{
                "name": "DOGGO EMP EFFECT",
                "desc": "Somehow the hounds now make your attacks cost {x more MP",
                "perLvl": 0.08,
                "maxVal": 30
            }),
        new AmplifierStoneBase(5, <AmplifierStoneModel>{
                "name": "CURSED HOWL",
                "desc": "Hounds have a 5% chance to be cursed, causing {x more Fear",
                "perLvl": 0.07,
                "maxVal": 20
            }),
        new AmplifierStoneBase(6, <AmplifierStoneModel>{
                "name": "DEN DESPAIR",
                "desc": "Start with your fear meter filled to {%",
                "perLvl": 0.1,
                "maxVal": 24
            }),
        new AmplifierStoneBase(7, <AmplifierStoneModel>{
                "name": "FAST AND DEADLY",
                "desc": "Hounds cause fear { seconds faster than normal",
                "perLvl": 0.07,
                "maxVal": 40
            })    
]
}
