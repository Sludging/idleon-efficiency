import { AFKTypeEnum } from '../enum/aFKTypeEnum';
import { EnemyTypeEnum } from '../enum/enemyTypeEnum';

export interface EnemyDetailsModel {
    Name: string,
    AFKtype: AFKTypeEnum,
    MonsterFace: number,
    MonsterOffsetX: number,
    MonsterOffsetY: number,
    HeightOfMonster: number,
    MonsterMoving: number,
    MovingFrame: number,
    RespawnTime: number,
    DeathFrame: number,
    MonsterHPTotal: number,
    Type: EnemyTypeEnum,
    SpecialType: string,
    ExpGiven: number,
    ExpType: number,
    Defence: number,
    MoveSPEED: number,
    Damages: number[],
    DefFor0?: number
}
