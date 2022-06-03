import { ComponentBaseModel } from './componentBaseModel';

export interface BuildingModel {
    name: string,
    description: string,
    bonus: string,
    lvlUpReq: ComponentBaseModel[],
    maxLvl: number,
    costInc: number,
    bonusInc: number[],
    misc: number
}
