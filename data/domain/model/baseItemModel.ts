import { TypeGenEnum } from '../enum/typeGenEnum';

export interface BaseItemModel {
    internalName: string,
    displayName: string,
    sellPrice: number,
    typeGen: TypeGenEnum,
    Type: string
}
