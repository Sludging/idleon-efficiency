import { CommonItemModel } from './commonItemModel';
import { TypeGenEnum } from '../enum/typeGenEnum';

export interface ConsumableItemModel extends CommonItemModel {
    desc_line1: string,
    desc_line2: string,
    desc_line3: string,
    desc_line4: string,
    desc_line5: string,
    desc_line6: string,
    desc_line7: string,
    desc_line8: string,
    Effect: string,
    Trigger: string,
    Amount: number,
    Cooldown: number
}
