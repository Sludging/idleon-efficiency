import { MineheadUpgradeModel } from '../model/mineheadUpgradeModel';

export class MineheadUpgradeBase { constructor(public index: number, public data: MineheadUpgradeModel) { } }



export const initMineheadUpgradeRepo = () => {
    return [    
        new MineheadUpgradeBase(0, <MineheadUpgradeModel>{
                "index": 0,
                "name": "Base Damage I",
                "maxLevel": 9999,
                "costExponent": 1.1,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Boosts your base damage in the classic game of Depth Charge by +{"
            }),
        new MineheadUpgradeBase(1, <MineheadUpgradeModel>{
                "index": 1,
                "name": "Numbahs",
                "maxLevel": 17,
                "costExponent": 6,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Increase the max possible Tile Number you can find to $! These are a MULTI for damage!"
            }),
        new MineheadUpgradeBase(2, <MineheadUpgradeModel>{
                "index": 2,
                "name": "Grid Expansion",
                "maxLevel": 16,
                "costExponent": 7.5,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "$"
            }),
        new MineheadUpgradeBase(3, <MineheadUpgradeModel>{
                "index": 3,
                "name": "Bettah Numbahs",
                "maxLevel": 9999,
                "costExponent": 1.15,
                "quantityPerLevel": 10,
                "rawField4": 0,
                "description": "Boosts your odds of getting bigger Tile Numbers by }x"
            }),
        new MineheadUpgradeBase(4, <MineheadUpgradeModel>{
                "index": 4,
                "name": "Mega Damage I",
                "maxLevel": 9999,
                "costExponent": 1.12,
                "quantityPerLevel": 5,
                "rawField4": 0,
                "description": "Permanently increases all damage you deal in the classic game of Depth Charge by +{%"
            }),
        new MineheadUpgradeBase(5, <MineheadUpgradeModel>{
                "index": 5,
                "name": "Miney Farmey I",
                "maxLevel": 9999,
                "costExponent": 1.1,
                "quantityPerLevel": 10,
                "rawField4": 0,
                "description": "Boosts the amount of Mine Currency you generate per hour by +{%"
            }),
        new MineheadUpgradeBase(6, <MineheadUpgradeModel>{
                "index": 6,
                "name": "Extra Lives",
                "maxLevel": 7,
                "costExponent": 250,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Start each game with +1 extra life!"
            }),
        new MineheadUpgradeBase(7, <MineheadUpgradeModel>{
                "index": 7,
                "name": "Base Damage II",
                "maxLevel": 9999,
                "costExponent": 1.1,
                "quantityPerLevel": 3,
                "rawField4": 0,
                "description": "Boosts your base damage in the classic game of Depth Charge by +{"
            }),
        new MineheadUpgradeBase(8, <MineheadUpgradeModel>{
                "index": 8,
                "name": "Golden Tiles",
                "maxLevel": 16,
                "costExponent": 8,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Click on up to { Golden Tiles per game, which are guaranteed to be safe from Depth Charges!"
            }),
        new MineheadUpgradeBase(9, <MineheadUpgradeModel>{
                "index": 9,
                "name": "Big Hit Combos",
                "maxLevel": 9999,
                "costExponent": 1.3,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Increases damage by +{% for every tile revealed, resetting at the start of each turn."
            }),
        new MineheadUpgradeBase(10, <MineheadUpgradeModel>{
                "index": 10,
                "name": "Boom Blocker",
                "maxLevel": 2,
                "costExponent": 1e+09,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Start each game of Depth Charge with +{ Blocks. Depth Charges HATE this feature!"
            }),
        new MineheadUpgradeBase(11, <MineheadUpgradeModel>{
                "index": 11,
                "name": "Final Round Fury",
                "maxLevel": 9999,
                "costExponent": 1.3,
                "quantityPerLevel": 2,
                "rawField4": 0,
                "description": "Your damage is }x higher when down to your last life!"
            }),
        new MineheadUpgradeBase(12, <MineheadUpgradeModel>{
                "index": 12,
                "name": "Multiplier Madness",
                "maxLevel": 10,
                "costExponent": 35,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "You can now find Multiplier Tiles, up to $! These multiply damage for the current turn."
            }),
        new MineheadUpgradeBase(13, <MineheadUpgradeModel>{
                "index": 13,
                "name": "Moar Moar Multi's",
                "maxLevel": 9999,
                "costExponent": 1.15,
                "quantityPerLevel": 6,
                "rawField4": 0,
                "description": "Boosts your odds of getting bigger Multiplier Tiles by }x"
            }),
        new MineheadUpgradeBase(14, <MineheadUpgradeModel>{
                "index": 14,
                "name": "Triple Crown Hunter",
                "maxLevel": 250,
                "costExponent": 1.16,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Tiles can now have a Blue Crown background, reveal 3 to multiply current damage by $"
            }),
        new MineheadUpgradeBase(15, <MineheadUpgradeModel>{
                "index": 15,
                "name": "Crown Craze",
                "maxLevel": 100,
                "costExponent": 1.4,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Boosts your odds of revealing Blue Crown backgrounds by }x"
            }),
        new MineheadUpgradeBase(16, <MineheadUpgradeModel>{
                "index": 16,
                "name": "Legal Cheating Button",
                "maxLevel": 20,
                "costExponent": 6,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Reveals a Depth Charges, has { uses, but has a 25% chance to break until next turn!"
            }),
        new MineheadUpgradeBase(17, <MineheadUpgradeModel>{
                "index": 17,
                "name": "Awesome Additives",
                "maxLevel": 10,
                "costExponent": 35,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "You can now find Additive Tiles, up to $! These boost your damage for the ENTIRE game!"
            }),
        new MineheadUpgradeBase(18, <MineheadUpgradeModel>{
                "index": 18,
                "name": "Always Adding",
                "maxLevel": 9999,
                "costExponent": 1.15,
                "quantityPerLevel": 5,
                "rawField4": 0,
                "description": "Boosts your odds of revealing bigger Additive Tiles by }x"
            }),
        new MineheadUpgradeBase(19, <MineheadUpgradeModel>{
                "index": 19,
                "name": "Clutch Overtime Block",
                "maxLevel": 1,
                "costExponent": 100000,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "When down to your last life, get +{ Block! Depth Charges STILL HATE this feature!!!"
            }),
        new MineheadUpgradeBase(20, <MineheadUpgradeModel>{
                "index": 20,
                "name": "Classic Flags",
                "maxLevel": 8,
                "costExponent": 500,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "You can place down { Flags, which show the amount of surrounding Depth Charges!"
            }),
        new MineheadUpgradeBase(21, <MineheadUpgradeModel>{
                "index": 21,
                "name": "Mega Damage II",
                "maxLevel": 9999,
                "costExponent": 1.1,
                "quantityPerLevel": 20,
                "rawField4": 0,
                "description": "Permanently increases all damage you deal in the classic game of Depth Charge by +{%"
            }),
        new MineheadUpgradeBase(22, <MineheadUpgradeModel>{
                "index": 22,
                "name": "Miney Farmey II",
                "maxLevel": 9999,
                "costExponent": 1.15,
                "quantityPerLevel": 15,
                "rawField4": 0,
                "description": "Boosts the amount of Mine Currency you generate per hour by +{%"
            }),
        new MineheadUpgradeBase(23, <MineheadUpgradeModel>{
                "index": 23,
                "name": "Jackpot Time",
                "maxLevel": 9999,
                "costExponent": 1.14,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Boosts your odds of finding Jackpot tiles! You've currently got a 1 in $ chance!"
            }),
        new MineheadUpgradeBase(24, <MineheadUpgradeModel>{
                "index": 24,
                "name": "Record Breaking Jackpots",
                "maxLevel": 6,
                "costExponent": 1000,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Jackpot Tiles now reveal $ tiles when found!"
            }),
        new MineheadUpgradeBase(25, <MineheadUpgradeModel>{
                "index": 25,
                "name": "Base Damage III",
                "maxLevel": 9999,
                "costExponent": 1.1,
                "quantityPerLevel": 12,
                "rawField4": 0,
                "description": "Boosts your base damage in the classic game of Depth Charge by +{"
            }),
        new MineheadUpgradeBase(26, <MineheadUpgradeModel>{
                "index": 26,
                "name": "El' Cheapo Upgrado",
                "maxLevel": 9999,
                "costExponent": 1.15,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "All upgrades are $% cheaper, now and forever!"
            }),
        new MineheadUpgradeBase(27, <MineheadUpgradeModel>{
                "index": 27,
                "name": "Mega Damage III",
                "maxLevel": 9999,
                "costExponent": 1.12,
                "quantityPerLevel": 50,
                "rawField4": 0,
                "description": "Permanently increases all damage you deal in the classic game of Depth Charge by +{%"
            }),
        new MineheadUpgradeBase(28, <MineheadUpgradeModel>{
                "index": 28,
                "name": "Miney Damagey Synergy",
                "maxLevel": 9999,
                "costExponent": 1.25,
                "quantityPerLevel": 2,
                "rawField4": 0,
                "description": "$"
            }),
        new MineheadUpgradeBase(29, <MineheadUpgradeModel>{
                "index": 29,
                "name": "Rift Guy's Upgrade",
                "maxLevel": 0,
                "costExponent": 9999999,
                "quantityPerLevel": 1,
                "rawField4": 0,
                "description": "Uh, yea. This is MY upgrade, NOT yours. I maxed it out because I'm me, duh."
            })    
]
}
