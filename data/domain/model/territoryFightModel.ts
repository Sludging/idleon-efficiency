import { TerritoryEnemyModel } from './territoryEnemyModel';

export interface TerritoryFightModel {
    img: string,
    trekReq: number,
    fightPower: number,
    enemyAttack: number,
    battleName: string,
    filler1: string,
    filler2: string,
    filler3: string,
    enemies: TerritoryEnemyModel[]
}
