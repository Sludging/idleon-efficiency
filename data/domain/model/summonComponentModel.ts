import { ComponentBaseModel } from './componentBaseModel';

export interface SummonComponentModel extends ComponentBaseModel {
    summonId: string,
    quantity: number
}
