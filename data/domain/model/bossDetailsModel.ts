import { BossAttackModel } from './bossAttackModel';

export interface BossDetailsModel {
    health: number,
    defence: number,
    exp: number,
    keys: number,
    attacks: BossAttackModel[]
}
