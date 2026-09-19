import { WorshipBaseInfoModel } from './worshipBaseInfoModel';
import { WorshipNodesModel } from './worshipNodesModel';
import { WorshipWaveModel } from './worshipWaveModel';

export interface WorshipModel {
    trialType: number,
    base: WorshipBaseInfoModel,
    waves: WorshipWaveModel[],
    nodes: WorshipNodesModel
}
