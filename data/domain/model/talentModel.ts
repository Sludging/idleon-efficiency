import { ActiveTalentModel } from './activeTalentModel';

export interface TalentModel {
    name: string,
    description: string,
    x1: number,
    x2: number,
    funcX: string,
    y1: number,
    y2: number,
    funcY: string,
    lvlUpText: string,
    skillIndex: number,
    activeData?: ActiveTalentModel
}
