import { ComponentBaseModel } from './componentBaseModel';

export interface JewelModel {
    x: number,
    y: number,
    range: number,
    effect: string,
    description: string,
    requirements: ComponentBaseModel[],
    name: string,
    bonusGiven: number
}
