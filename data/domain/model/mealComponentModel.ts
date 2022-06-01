import { ComponentBaseModel } from './componentBaseModel';

export interface MealComponentModel extends ComponentBaseModel {
    mealNo: string,
    quantity: number
}
