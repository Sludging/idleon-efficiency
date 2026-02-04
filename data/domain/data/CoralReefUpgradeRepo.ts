import { CoralReefUpgradeModel } from "../model/coralReefUpgradeModel"

export class CoralReefUpgradeBase { constructor(public index: number, public data: CoralReefUpgradeModel) { } }



export const initCoralReefUpgradeRepo = () => {
    return [
        new CoralReefUpgradeBase(0, <CoralReefUpgradeModel>{
            desc: "Every day you play, your Grind Time bubble gets +{ LVs",
            x0: 15,
            x1: 10,
            x2: 1.25,
            x3: 243,
            x4: 0,
            x5: 274,
            x6: 22,
            x7: 324,
            x8: 19,
            x9: 31,
            x10: 171,
            x11: 389
        }),
        new CoralReefUpgradeBase(1, <CoralReefUpgradeModel>{
            desc: "Orange...",
            x0: 1,
            x1: 10,
            x2: 1.5,
            x3: 300,
            x4: 332,
            x5: 63,
            x6: 400,
            x7: 300,
            x8: 20,
            x9: 0,
            x10: 400,
            x11: 400
        }),
        new CoralReefUpgradeBase(2, <CoralReefUpgradeModel>{
            desc: "Adds a new bonus to your Tome's Epilogue in World 4, which goes up with your Tome Score!",
            x0: 10,
            x1: 15,
            x2: 1.65,
            x3: 236,
            x4: 328,
            x5: 248,
            x6: 350,
            x7: 309,
            x8: 25,
            x9: 0,
            x10: 479,
            x11: 381
        }),
        new CoralReefUpgradeBase(3, <CoralReefUpgradeModel>{
            desc: "Adds a new mini 'Ninja Knowledge' upgrade, level it up with your Jade!",
            x0: 12,
            x1: 10,
            x2: 1.55,
            x3: 263,
            x4: 611,
            x5: 270,
            x6: 647,
            x7: 325,
            x8: 24,
            x9: 0,
            x10: 789,
            x11: 384
        }),
        new CoralReefUpgradeBase(4, <CoralReefUpgradeModel>{
            desc: "The Gallery gives +{% higher bonuses, and has +} more slots for Trophies",
            x0: 10,
            x1: 40,
            x2: 1.5,
            x3: 290,
            x4: 0,
            x5: 13,
            x6: 24,
            x7: 95,
            x8: 28,
            x9: 13,
            x10: 164,
            x11: 189
        }),
        new CoralReefUpgradeBase(5, <CoralReefUpgradeModel>{
            desc: "Blue...",
            x0: 1,
            x1: 10,
            x2: 1.5,
            x3: 300,
            x4: 615,
            x5: 52,
            x6: 400,
            x7: 300,
            x8: 20,
            x9: 0,
            x10: 400,
            x11: 400
        }),
    ]
}