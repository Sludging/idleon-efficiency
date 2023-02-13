import { BuildTalentModel } from './buildTalentModel';

export interface BuildTabModel {
    name: string,
    talents: BuildTalentModel[],
    note: string
}
