import { ComponentBaseModel } from './componentBaseModel';

export interface ComponentModel extends ComponentBaseModel {
    item: string,
    quantity: number
}
