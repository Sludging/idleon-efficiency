import { WeeklyShopSectionEnum } from '../enum/weeklyShopSectionEnum';

export interface WeeklyShopModel {
    name: string,
    section: WeeklyShopSectionEnum,
    cost: number,
    intName: string,
    desc: string,
    itemType: number
}
