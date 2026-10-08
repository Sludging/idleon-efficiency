

export interface JellyCellModel {
    index: number,
    name: string,
    tileCount: number,
    footprintOffsets: number[],
    passiveDescription?: string,
    damageCoefficient: number,
    attackCooldownCoefficient: number
}
