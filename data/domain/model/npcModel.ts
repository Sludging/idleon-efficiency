import { DialogueLineModel } from './dialogueLineModel';
import { NpcHeadModel } from './npcHeadModel';
import { QuestModel } from './questModel';

export interface NpcModel {
    head?: NpcHeadModel,
    quests: Record<string, QuestModel>,
    dialogue: DialogueLineModel[]
}
