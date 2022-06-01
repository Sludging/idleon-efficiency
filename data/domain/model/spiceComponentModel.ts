import { ComponentBaseModel } from './componentBaseModel';

export interface SpiceComponentModel extends ComponentBaseModel {
    spiceNo: string,
    quantity: number
}
