import { HarpStringModel } from '../model/harpStringModel';

export class HarpStringBase { constructor(public index: number, public data: HarpStringModel) { } }



export const initHarpStringsRepo = () => {
    return [    
        new HarpStringBase(0, <HarpStringModel>{
                "stringId": 0,
                "stringLetter": "C",
                "description": "Creates { of the note you're tuned to! @ LV bonus: +}% Harp Note Gain",
                "multiplier": 10
            }),
        new HarpStringBase(1, <HarpStringModel>{
                "stringId": 1,
                "stringLetter": "D",
                "description": "Has a {% chance of finding an opal! @ LV bonus:  x Harp Note Gain",
                "multiplier": 6
            }),
        new HarpStringBase(2, <HarpStringModel>{
                "stringId": 2,
                "stringLetter": "E",
                "description": "Doesn't do anything... but its LV bonus is freakin' epic! @ LV bonus:  x Harp Power/hr",
                "multiplier": 5
            }),
        new HarpStringBase(3, <HarpStringModel>{
                "stringId": 3,
                "stringLetter": "F",
                "description": "Creates { of the tune, and notes next to the tune! @ LV bonus: +}% Harp Note Gain",
                "multiplier": 13
            }),
        new HarpStringBase(4, <HarpStringModel>{
                "stringId": 4,
                "stringLetter": "G",
                "description": "Gives { EXP to all string types! @ LV bonus: +}% String EXP Gain!",
                "multiplier": 20
            }),
        new HarpStringBase(5, <HarpStringModel>{
                "stringId": 5,
                "stringLetter": "A",
                "description": "Creates { of every note you know! @ LV bonus: +}% Harp Note Gain",
                "multiplier": 18
            }),
        new HarpStringBase(6, <HarpStringModel>{
                "stringId": 6,
                "stringLetter": "B",
                "description": "AijowfWE wjioaef, jopfweaj waf gtojigr joifs! @ LV bonus: +}% omefw jiowef",
                "multiplier": 0
            })    
]
}
