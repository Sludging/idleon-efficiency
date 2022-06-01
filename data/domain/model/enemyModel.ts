import { BossDetailsModel } from './bossDetailsModel';
import { EnemyDetailsModel } from './enemyDetailsModel';
import { EnemyNavModel } from './enemyNavModel';
import { EnemyTableModel } from './enemyTableModel';
import { MapDataModel } from './mapDataModel';

export interface EnemyModel {
    details: EnemyDetailsModel,
    drops?: EnemyTableModel,
    mapData?: MapDataModel,
    navigation?: EnemyNavModel,
    bossData?: BossDetailsModel
}
