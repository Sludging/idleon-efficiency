import { ComponentBaseModel } from './componentBaseModel';

export interface SoulComponentModel extends ComponentBaseModel {
    soulId: string,
    quantity: number
}
