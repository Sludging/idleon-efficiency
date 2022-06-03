import { ComponentBaseModel } from './componentBaseModel';
import { ComponentModel } from './componentModel';
import { NoteModel } from './noteModel';
import { QuestModel } from './questModel';
import { QuestTypeEnum } from '../enum/questTypeEnum';

export interface ItemQuestModel extends QuestModel {
    ItemReq: ComponentBaseModel[]
}
