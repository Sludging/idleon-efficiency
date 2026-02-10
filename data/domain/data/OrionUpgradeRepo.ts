import { ClickerUpgradeModel } from "../model/clickerUpgradeModel";

export class OrionUpgradeBase { constructor(public index: number, public data: ClickerUpgradeModel) { } }

export const initOrionUpgradeRepo = (): OrionUpgradeBase[] => {
    return [
        new OrionUpgradeBase(0, {
            name: "Feather Generation",
            x0: 5, 
            x1: 1.1, 
            unlock: 100,
            desc: "Generates } feather per second", 
            x2: 0
        }),
        new OrionUpgradeBase(1, {
            name: "Bonuses of Orion",
            x0: 350, 
            x1: 25, 
            unlock: 1000,
            desc: "Gain a permanent bonus in the real game! This upgrade never resets.", 
            x2: 0
        }),
        new OrionUpgradeBase(2, {
            name: "Feather Multiplier",
            x0: 500, 
            x1: 1.11, 
            unlock: 2500,
            desc: "Boosts feather generation by +}%", 
            x2: 0
        }),
        new OrionUpgradeBase(3, {
            name: "Feather Cheapener",
            x0: 3000, 
            x1: 1.16, 
            unlock: 30000,
            desc: "All feather upgrades are @% cheaper", 
            x2: 0
        }),
        new OrionUpgradeBase(4, {
            name: "Feather Restart",
            x0: 1000000, 
            x1: 14, 
            unlock: 750000,
            desc: "Reset almost all Upgrades and Feathers. Generate {x Feathers", 
            x2: 0
        }),
        new OrionUpgradeBase(5, {
            name: "Super Feather Production",
            x0: 2000000, 
            x1: 1.12, 
            unlock: 10000000,
            desc: "Generates +} more feathers per second", 
            x2: 0
        }),
        new OrionUpgradeBase(6, {
            name: "Shiny Feathers",
            x0: 5000000, 
            x1: 1.4, 
            unlock: 250000000,
            desc: "Rare chance for a Shiny Feather, each one gives +}% feather generation", 
            x2: 0
        }),
        new OrionUpgradeBase(7, {
            name: "Super Feather Cheapener",
            x0: 50000000, 
            x1: 1.27, 
            unlock: 5000000000,
            desc: "All feather upgrades are }% cheaper", 
            x2: 0
        }),
        new OrionUpgradeBase(8, {
            name: "The Great Mega Reset",
            x0: 250000000000, 
            x1: 20, 
            unlock: 100000000000,
            desc: "Reset almost everything. Gain a permanent Megafeather", 
            x2: 0
        }),
    ]
}