import { PoolTypeEnum } from '../enum/poolTypeEnum';

export interface FishPoolModel {
    fish: string,
    expGiven: number,
    damageDelt: number,
    efficiency: number,
    cardDrop: string,
    cardChance: number,
    pool: PoolTypeEnum
}
