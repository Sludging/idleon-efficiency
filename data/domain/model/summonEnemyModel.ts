import { SummonEnemyBonusModel } from './summonEnemyBonusModel';

export interface SummonEnemyModel {
    enemyId: string,
    damage: number,
    health: number,
    x4: number,
    territoryName: string,
    bonusId: (number | string),
    bonus?: SummonEnemyBonusModel,
    x8: (number | string),
    x9: (number | string)
}
