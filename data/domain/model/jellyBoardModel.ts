import { JellyObstructionSlotGrantModel } from './jellyObstructionSlotGrantModel';
import { JellyPlotModel } from './jellyPlotModel';

export interface JellyBoardModel {
    columns: number,
    rows: number,
    initialSlots: number[],
    blockedSlots: number[],
    obstructionSlotGrants: JellyObstructionSlotGrantModel[],
    plots: JellyPlotModel[]
}
