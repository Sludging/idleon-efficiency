import { DungTraitModel } from './dungTraitModel';

export interface DungSetModel {
    rankReq: number,
    name: string,
    traits: DungTraitModel[]
}
