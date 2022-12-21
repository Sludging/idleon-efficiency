import { DivinityStyleModel } from '../model/divinityStyleModel';

export class DivinityStyleBase { constructor(public index: number, public data: DivinityStyleModel) { } }



export const initDivinityStyleRepo = () => {
    return [    
        new DivinityStyleBase(0, <DivinityStyleModel>{
                "name": "Kinesis",
                "desc": "The beginner approach of flailing your arms around! @ Gives 1 Divinity and 1 EXP per hour"
            }),
        new DivinityStyleBase(1, <DivinityStyleModel>{
                "name": "Chakra",
                "desc": "Keep your internal wheel rotating at all times! @ Gives 2 Divinity and 2 EXP per hour"
            }),
        new DivinityStyleBase(2, <DivinityStyleModel>{
                "name": "Focus",
                "desc": "Block out all unwanted stimulus and information!  @ Gives 4 Divinity and 1 EXP per hour"
            }),
        new DivinityStyleBase(3, <DivinityStyleModel>{
                "name": "Mantra",
                "desc": "One for all, one for all, one for all... @ Gives 1 EXP to ALL characters per hour"
            }),
        new DivinityStyleBase(4, <DivinityStyleModel>{
                "name": "Vitalic",
                "desc": "Open your heart and grow as a player! @ Gives 2 Divinity and 7 EXP per hour"
            }),
        new DivinityStyleBase(5, <DivinityStyleModel>{
                "name": "TranQi",
                "desc": "Exude raw tranquility at all times! @ Gives 3 EXP per hour even when not meditating"
            }),
        new DivinityStyleBase(6, <DivinityStyleModel>{
                "name": "Zen",
                "desc": "Find inner peace and become one with the divine! @ Gives 8 Divinity and 8 EXP per hour"
            }),
        new DivinityStyleBase(7, <DivinityStyleModel>{
                "name": "Mindful",
                "desc": "Feel connected to every atom of the universe! @ Gives 15 Divinity and 10 EXP per hour"
            })    
]
}
