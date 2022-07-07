import { ComponentBaseModel } from './componentBaseModel';

export interface BubbleModel {
    cauldron: string,
    name: string,
    x1: number,
    x2: number,
    func: string,
    description: string,
    requirements: ComponentBaseModel[],
    bonusKey: string
}
