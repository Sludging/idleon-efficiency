import { ComponentModel } from './componentModel';
import { DialogueLineModel } from './dialogueLineModel';
import { NoteModel } from './noteModel';
import { QuestTypeEnum } from '../enum/questTypeEnum';

export interface QuestModel extends DialogueLineModel {
    ConsumeItems: boolean,
    InventorySpacesNeeded: number,
    NoSpaceIndex: number,
    Rewards: ComponentModel[],
    QuestName: string,
    Difficulty?: number,
    note?: NoteModel
}
