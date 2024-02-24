import { ComponentBaseModel } from './componentBaseModel';

export interface CropComponentModel extends ComponentBaseModel {
    cropId: string,
    quantity: number
}
