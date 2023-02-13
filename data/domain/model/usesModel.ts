import { TypeGenEnum } from '../enum/typeGenEnum';
import { UseModel } from './useModel';

export interface UsesModel {
    uses: UseModel[],
    typeGen: TypeGenEnum,
    type: string
}
