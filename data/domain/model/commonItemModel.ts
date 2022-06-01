import { TypeGenEnum } from '../enum/typeGenEnum';

export interface CommonItemModel {
    internalID: string,
    displayName: string,
    sellPrice: number,
    typeGen: TypeGenEnum,
    ID: number,
    Type: string,
    lvReqToCraft: number
}
