

export interface GrimoireUpgradeModel {
    name: string,
    base_cost: number,
    scaling_factor: number,
    x1: number,
    max_level: number,
    value: number,
    unlock_req: number,
    x2: number,
    description: string,
    has_tooltip: boolean,
    tooltip_text?: string
}
