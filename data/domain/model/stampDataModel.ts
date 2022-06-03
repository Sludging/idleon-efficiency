import { QtylessComponentModel } from './qtylessComponentModel';

export interface StampDataModel {
    effect: string,
    function: string,
    x1: number,
    x2: number,
    upgradeInterval: number,
    material: QtylessComponentModel,
    startV: number,
    mCostExp: number,
    startingCost: number,
    cCostExp: number,
    i10: number,
    upgradeText: string,
    i12: number
}
