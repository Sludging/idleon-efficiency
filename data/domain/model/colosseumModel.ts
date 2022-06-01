import { ColWaveModel } from './colWaveModel';

export interface ColosseumModel {
    name: string,
    map: number,
    node: number,
    colMap: number,
    keyCost: number,
    infoX: number,
    infoY: number,
    bronzeScore: number,
    silverScore: number,
    goldScore: number,
    bronzeNode: number,
    silverNode: number,
    goldNode: number,
    bronzeX: number,
    silverX: number,
    goldX: number,
    waves: ColWaveModel[]
}
