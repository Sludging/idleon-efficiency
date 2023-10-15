import { ActionTypeEnum } from '../enum/actionTypeEnum';

export interface WeeklyActionModel {
    actionType: ActionTypeEnum,
    desc: string,
    scaling: number,
    max: number,
    key: string
}
