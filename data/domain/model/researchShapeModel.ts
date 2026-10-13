import { ResearchPointModel } from './researchPointModel';

export interface ResearchShapeModel {
    index: number,
    name: string,
    vertices: ResearchPointModel[],
    width: number,
    height: number,
    bonusPercent: number,
    descriptionTemplate: string
}
