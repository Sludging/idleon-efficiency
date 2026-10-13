import { ResearchPostyNoteModel } from '../model/researchPostyNoteModel';

export class ResearchPostyNoteBase { constructor(public index: number, public data: ResearchPostyNoteModel) { } }



export const initResearchPostyNoteRepo = () => {
    return [    
        new ResearchPostyNoteBase(0, <ResearchPostyNoteModel>{
                "index": 0,
                "requiredResearchLevel": 10,
                "description": "Adds a new Magnifier for you to use! Drag it around just like you do with your other magnifier!",
                "hiddenX": -140,
                "hiddenY": 2,
                "rotationDegrees": -10,
                "shownX": 20,
                "shownY": 34
            }),
        new ResearchPostyNoteBase(1, <ResearchPostyNoteModel>{
                "index": 1,
                "requiredResearchLevel": 20,
                "description": "Adds a new shape to your Research Grid, which boosts the bonuses of all squares it touches!",
                "hiddenX": 60,
                "hiddenY": -129,
                "rotationDegrees": 13,
                "shownX": 125,
                "shownY": 69
            }),
        new ResearchPostyNoteBase(2, <ResearchPostyNoteModel>{
                "index": 2,
                "requiredResearchLevel": 30,
                "description": "Adds another shape to your Research Grid! Keep in mind, each grid upgrade can only be boosted by one shape at a time. No point in overlapping shapes!",
                "hiddenX": 239,
                "hiddenY": -127,
                "rotationDegrees": 3,
                "shownX": 244,
                "shownY": 29
            }),
        new ResearchPostyNoteBase(3, <ResearchPostyNoteModel>{
                "index": 3,
                "requiredResearchLevel": 40,
                "description": "You can now place TWO magnifiers on the same Observation!",
                "hiddenX": -126,
                "hiddenY": 86,
                "rotationDegrees": 5,
                "shownX": 46,
                "shownY": 158
            }),
        new ResearchPostyNoteBase(4, <ResearchPostyNoteModel>{
                "index": 4,
                "requiredResearchLevel": 50,
                "description": "Adds another shape to your Research Grid!",
                "hiddenX": -127,
                "hiddenY": 114,
                "rotationDegrees": -2,
                "shownX": 181,
                "shownY": 180
            }),
        new ResearchPostyNoteBase(5, <ResearchPostyNoteModel>{
                "index": 5,
                "requiredResearchLevel": 60,
                "description": "You now get an additional Grid Point every 10 Research Levels!",
                "hiddenX": 289,
                "hiddenY": -131,
                "rotationDegrees": -5,
                "shownX": 362,
                "shownY": 50
            }),
        new ResearchPostyNoteBase(6, <ResearchPostyNoteModel>{
                "index": 6,
                "requiredResearchLevel": 70,
                "description": "You can now place THREE magnifiers on the same Observation!",
                "hiddenX": 265,
                "hiddenY": -135,
                "rotationDegrees": 10,
                "shownX": 294,
                "shownY": 142
            }),
        new ResearchPostyNoteBase(7, <ResearchPostyNoteModel>{
                "index": 7,
                "requiredResearchLevel": 80,
                "description": "Adds another shape to your Research Grid!",
                "hiddenX": -130,
                "hiddenY": 190,
                "rotationDegrees": -3,
                "shownX": 22,
                "shownY": 267
            }),
        new ResearchPostyNoteBase(8, <ResearchPostyNoteModel>{
                "index": 8,
                "requiredResearchLevel": 90,
                "description": "You can now rotate your shapes! You'll find the rotation buttons after selecting a shape.",
                "hiddenX": 396,
                "hiddenY": -128,
                "rotationDegrees": 8,
                "shownX": 473,
                "shownY": 24
            }),
        new ResearchPostyNoteBase(9, <ResearchPostyNoteModel>{
                "index": 9,
                "requiredResearchLevel": 100,
                "description": "Adds yet another Magnifier to your Clipboard! Those Observations wont observe themselves!",
                "hiddenX": 438,
                "hiddenY": -128,
                "rotationDegrees": 2,
                "shownX": 435,
                "shownY": 144
            }),
        new ResearchPostyNoteBase(10, <ResearchPostyNoteModel>{
                "index": 10,
                "requiredResearchLevel": 110,
                "description": "Adds another shape to your Research Grid!",
                "hiddenX": -128,
                "hiddenY": 230,
                "rotationDegrees": 3,
                "shownX": 136,
                "shownY": 271
            }),
        new ResearchPostyNoteBase(11, <ResearchPostyNoteModel>{
                "index": 11,
                "requiredResearchLevel": 120,
                "description": "You can now place TWENTY magnif.... wait, wait no, I meant four... FOUR magnifiers on the same Observation!",
                "hiddenX": -130,
                "hiddenY": 240,
                "rotationDegrees": -3,
                "shownX": 273,
                "shownY": 267
            }),
        new ResearchPostyNoteBase(12, <ResearchPostyNoteModel>{
                "index": 12,
                "requiredResearchLevel": 130,
                "description": "Adds an additional Magnifier to your Clipboard!",
                "hiddenX": 272,
                "hiddenY": -132,
                "rotationDegrees": 4,
                "shownX": 382,
                "shownY": 244
            }),
        new ResearchPostyNoteBase(13, <ResearchPostyNoteModel>{
                "index": 13,
                "requiredResearchLevel": 140,
                "description": "+1 Magnifier! Bro why you even clicking on this one, you absolutely knew what this did from the picture...",
                "hiddenX": 426,
                "hiddenY": -138,
                "rotationDegrees": -11,
                "shownX": 496,
                "shownY": 260
            })    
]
}
