import { JellyBoardModel } from './jellyBoardModel';

export interface JellyOperationMetadataModel {
    initialObstructionHp: Record<string, number>,
    board: JellyBoardModel
}
