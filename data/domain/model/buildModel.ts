import { BuildTabModel } from './buildTabModel';

export interface BuildModel {
    title: string,
    notes: string,
    version: string,
    level: number,
    tabs: BuildTabModel[],
    idleonClass: string
}
