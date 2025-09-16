import { ItemRequirementModel } from './itemRequirementModel';
import { MeasurementTypeModel } from './measurementTypeModel';

export interface MeasurementModel {
    index: number,
    itemRequirement: ItemRequirementModel,
    measurementType: MeasurementTypeModel,
    description: string,
    formula: string,
    formulaType: string
}
