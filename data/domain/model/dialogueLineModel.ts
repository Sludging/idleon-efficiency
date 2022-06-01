import { QuestTypeEnum } from '../enum/questTypeEnum';

export interface DialogueLineModel {
    Type: QuestTypeEnum,
    DialogueText: string,
    NextIndex: number,
    Name?: string
}
