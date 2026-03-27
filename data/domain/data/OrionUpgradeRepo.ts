import { OrionUpgradeModel } from '../model/orionUpgradeModel';

export class OrionUpgradeBase { constructor(public index: number, public data: OrionUpgradeModel) { } }



export const initOrionUpgradeRepo = () => {
    return [    
        new OrionUpgradeBase(0, <OrionUpgradeModel>{
                "name": "Feather Generation",
                "x0": 5,
                "x1": 1.1,
                "unlock": 100,
                "desc": "Generates } feather per second",
                "x2": 0
            }),
        new OrionUpgradeBase(1, <OrionUpgradeModel>{
                "name": "Bonuses of Orion",
                "x0": 350,
                "x1": 25,
                "unlock": 1000,
                "desc": "Gain a permanent bonus in the real game! This upgrade never resets.",
                "x2": 0
            }),
        new OrionUpgradeBase(2, <OrionUpgradeModel>{
                "name": "Feather Multiplier",
                "x0": 500,
                "x1": 1.11,
                "unlock": 2500,
                "desc": "Boosts feather generation by +}%",
                "x2": 0
            }),
        new OrionUpgradeBase(3, <OrionUpgradeModel>{
                "name": "Feather Cheapener",
                "x0": 3000,
                "x1": 1.16,
                "unlock": 30000,
                "desc": "All feather upgrades are @% cheaper",
                "x2": 0
            }),
        new OrionUpgradeBase(4, <OrionUpgradeModel>{
                "name": "Feather Restart",
                "x0": 1e+06,
                "x1": 14,
                "unlock": 750000,
                "desc": "Reset almost all Upgrades and Feathers. Generate {x Feathers",
                "x2": 0
            }),
        new OrionUpgradeBase(5, <OrionUpgradeModel>{
                "name": "Super Feather Production",
                "x0": 2e+06,
                "x1": 1.12,
                "unlock": 1e+07,
                "desc": "Generates +} more feathers per second",
                "x2": 0
            }),
        new OrionUpgradeBase(6, <OrionUpgradeModel>{
                "name": "Shiny Feathers",
                "x0": 5e+06,
                "x1": 1.4,
                "unlock": 2.5e+08,
                "desc": "Rare chance for a Shiny Feather, each one gives +}% feather generation",
                "x2": 0
            }),
        new OrionUpgradeBase(7, <OrionUpgradeModel>{
                "name": "Super Feather Cheapener",
                "x0": 5e+07,
                "x1": 1.27,
                "unlock": 5e+09,
                "desc": "All feather upgrades are }% cheaper",
                "x2": 0
            }),
        new OrionUpgradeBase(8, <OrionUpgradeModel>{
                "name": "The Great Mega Reset",
                "x0": 2.5e+11,
                "x1": 20,
                "unlock": 1e+11,
                "desc": "Reset almost everything. Gain a permanent Megafeather",
                "x2": 0
            })    
]
}
