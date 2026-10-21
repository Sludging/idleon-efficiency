import { MineheadGridSizeModel } from './mineheadGridSizeModel';

export interface MineheadMetadataModel {
    gridSizesByLevel: MineheadGridSizeModel[],
    damageMultiplierByQuantity: number[],
    additivePercentByQuantity: number[]
}
