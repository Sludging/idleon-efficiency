import { SummonEnemyBonusModel } from './summonEnemyBonusModel';

export interface SummonEnemyModel {
    enemyId: string,
    xOff: number,
    yOff: number,
    width: number,
    territoryName: string,
    bonusId: (number | string),
    bonus?: SummonEnemyBonusModel,
    bonusQty: (number | string),
    difficulty: (number | string)
}
