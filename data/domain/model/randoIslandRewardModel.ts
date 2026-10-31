

export interface RandoIslandRewardModel {
    index: number,
    initialBaseCost: number,
    initialCostGrowth?: number,
    refreshedBaseCost?: number,
    refreshedCostGrowth?: number,
    itemId?: string,
    bookPayload?: number
}
