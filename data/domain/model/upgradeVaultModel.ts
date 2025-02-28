

export interface UpgradeVaultModel {
    name: string,
    base_cost: number,
    scaling_factor: number,
    x1: number,
    unlock_req: number,
    value: number,
    max_level: number,
    description_line1: string,
    description_line2?: string,
    has_tooltip: boolean,
    x2?: string,
    tooltip_text?: string
}
