import { AccountWideQuestModel } from './accountWideQuestModel';
import { MainQuestModel } from './mainQuestModel';

export interface QuestMetadataModel {
    mainQuests: MainQuestModel[],
    accountWideQuests: AccountWideQuestModel[]
}
