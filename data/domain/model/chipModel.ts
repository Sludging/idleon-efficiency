import { ComponentBaseModel } from './componentBaseModel';

export interface ChipModel {
    name: string,
    bonus: string,
    description: string,
    requirements: ComponentBaseModel[],
    bool1: boolean,
    stat: string,
    baseVal: number
}
