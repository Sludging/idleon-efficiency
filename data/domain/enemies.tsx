import { EnemyBase, initEnemyRepo } from "./data/EnemyRepo";
import { ImageData } from "./imageData";
import { BossDetailsModel } from "./model/bossDetailsModel";
import { EnemyDetailsModel } from "./model/enemyDetailsModel";
import { EnemyModel } from "./model/enemyModel";
import { EnemyNavModel } from "./model/enemyNavModel";
import { EnemyTableModel } from "./model/enemyTableModel";
import { MapDataModel } from "./model/mapDataModel";

export class EnemyData {
    details: EnemyDetailsModel
    drops: EnemyTableModel | undefined
    mapData: MapDataModel | undefined
    navigation: EnemyNavModel | undefined
    bossData: BossDetailsModel | undefined

    constructor(public id: string, public data: EnemyModel) {
        this.details = data.details;
        this.drops = data.drops;
        this.mapData = data.mapData;
        this.navigation = data.navigation;
        this.bossData = data.bossData;
    }

    getImageData = (): ImageData => {
        if (this.id == "mini3a" || this.id == "mini4a") {
            return {
                location: this.id,
                height: 68,
                width: 81
            }    
        }
        return {
            location: `Mface${this.details.MonsterFace}`,
            height: 41,
            width: 35
        }
    }

    static fromBase = (data: EnemyBase[]) => {
        return data.map(enemy => new EnemyData(enemy.id, enemy.data))
    }
}

export const EnemyInfo: EnemyData[] = EnemyData.fromBase(initEnemyRepo())