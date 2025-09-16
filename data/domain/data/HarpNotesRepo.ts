import { HarpNoteModel } from '../model/harpNoteModel';

export class HarpNoteBase { constructor(public index: number, public data: HarpNoteModel) { } }



export const initHarpNotesRepo = () => {
    return [    
        new HarpNoteBase(0, <HarpNoteModel>{"noteId": 0, "noteName": "Crotchet Note"}),
        new HarpNoteBase(1, <HarpNoteModel>{"noteId": 1, "noteName": "Natural Note"}),
        new HarpNoteBase(2, <HarpNoteModel>{"noteId": 2, "noteName": "Bass Note"}),
        new HarpNoteBase(3, <HarpNoteModel>{"noteId": 3, "noteName": "Treble Note"}),
        new HarpNoteBase(4, <HarpNoteModel>{"noteId": 4, "noteName": "Eighth Note"}),
        new HarpNoteBase(5, <HarpNoteModel>{"noteId": 5, "noteName": "Quaver Note"}),
        new HarpNoteBase(6, <HarpNoteModel>{"noteId": 6, "noteName": "Sharp Note"}),
        new HarpNoteBase(7, <HarpNoteModel>{"noteId": 7, "noteName": "(F)Clef Note"}),
        new HarpNoteBase(8, <HarpNoteModel>{"noteId": 8, "noteName": "(G)Clef Note"}),
        new HarpNoteBase(9, <HarpNoteModel>{"noteId": 9, "noteName": "Sixteenth Note"})    
]
}
