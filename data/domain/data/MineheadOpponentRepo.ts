import { MineheadOpponentModel } from '../model/mineheadOpponentModel';

export class MineheadOpponentBase { constructor(public index: number, public data: MineheadOpponentModel) { } }



export const initMineheadOpponentRepo = () => {
    return [    
        new MineheadOpponentBase(0, <MineheadOpponentModel>{
                "progressionIndex": 0,
                "displayId": 20,
                "name": "Bronzehead",
                "ordinalLabel": "first",
                "titleLabel": "the honorable",
                "bonusDescription": "}x Total Damage and }x Drop Rate! @ (NOTE:All Bonuses earned from beating Opponents affect the rest of the game)",
                "bonusValue": 10
            }),
        new MineheadOpponentBase(1, <MineheadOpponentModel>{
                "progressionIndex": 1,
                "displayId": 3,
                "name": "Gemhead",
                "ordinalLabel": "second",
                "titleLabel": "the honorable",
                "bonusDescription": "+{% AFK gains for Research! This affects offline Research, you get 100% gains if you're online! Current Research AFK rate: $%.",
                "bonusValue": 2
            }),
        new MineheadOpponentBase(2, <MineheadOpponentModel>{
                "progressionIndex": 2,
                "displayId": 19,
                "name": "Yarnhead",
                "ordinalLabel": "third",
                "titleLabel": "the honorable",
                "bonusDescription": "+{ new Research Magnifier to study your Observations!",
                "bonusValue": 1
            }),
        new MineheadOpponentBase(3, <MineheadOpponentModel>{
                "progressionIndex": 3,
                "displayId": 16,
                "name": "Sashimihead",
                "ordinalLabel": "fourth",
                "titleLabel": "the honorable",
                "bonusDescription": "Increases the Max LV of 'Blooming Axe' upgrade in Breeding by +{ LVs",
                "bonusValue": 40
            }),
        new MineheadOpponentBase(4, <MineheadOpponentModel>{
                "progressionIndex": 4,
                "displayId": 21,
                "name": "Bleckhead",
                "ordinalLabel": "fifth",
                "titleLabel": "the honorable",
                "bonusDescription": "+{% Damage per Weapon POW. Based on your current weapon, you're getting $x Damage",
                "bonusValue": 1
            }),
        new MineheadOpponentBase(5, <MineheadOpponentModel>{
                "progressionIndex": 5,
                "displayId": 17,
                "name": "Saturnhead",
                "ordinalLabel": "sixth",
                "titleLabel": "the honorable",
                "bonusDescription": "All of Bubba the Seal's upgrades are }x cheaper than normal",
                "bonusValue": 100
            }),
        new MineheadOpponentBase(6, <MineheadOpponentModel>{
                "progressionIndex": 6,
                "displayId": 1,
                "name": "Basshead",
                "ordinalLabel": "seventh",
                "titleLabel": "the honorable",
                "bonusDescription": "Multiplies Minehead Currency gain by }x",
                "bonusValue": 50
            }),
        new MineheadOpponentBase(7, <MineheadOpponentModel>{
                "progressionIndex": 7,
                "displayId": 12,
                "name": "Kelphead",
                "ordinalLabel": "eighth",
                "titleLabel": "the honorable",
                "bonusDescription": "Unlock another Atom for your Atom Collider, which boosts minehead currency gain when upgraded",
                "bonusValue": 1
            }),
        new MineheadOpponentBase(8, <MineheadOpponentModel>{
                "progressionIndex": 8,
                "displayId": 14,
                "name": "Snouthead",
                "ordinalLabel": "ninth",
                "titleLabel": "the honorable",
                "bonusDescription": "+{ more weekly Exotic Market purchases for Farming, and first few purchases cost no crops",
                "bonusValue": 2
            }),
        new MineheadOpponentBase(9, <MineheadOpponentModel>{
                "progressionIndex": 9,
                "displayId": 26,
                "name": "Threadhead",
                "ordinalLabel": "tenth",
                "titleLabel": "the honorable",
                "bonusDescription": "+{ Max LVs for blessing upgrades, for all Divinities",
                "bonusValue": 80
            }),
        new MineheadOpponentBase(10, <MineheadOpponentModel>{
                "progressionIndex": 10,
                "displayId": 8,
                "name": "Clownhead",
                "ordinalLabel": "eleventh",
                "titleLabel": "the honorable",
                "bonusDescription": "+{% extra AFK gains for research",
                "bonusValue": 3
            }),
        new MineheadOpponentBase(11, <MineheadOpponentModel>{
                "progressionIndex": 11,
                "displayId": 2,
                "name": "Goldhead",
                "ordinalLabel": "twelfth",
                "titleLabel": "the honorable",
                "bonusDescription": "}x multiplier to Bucks gained in the Sushi Station",
                "bonusValue": 25
            }),
        new MineheadOpponentBase(12, <MineheadOpponentModel>{
                "progressionIndex": 12,
                "displayId": 13,
                "name": "Maizehead",
                "ordinalLabel": "thirteenth",
                "titleLabel": "the honorable",
                "bonusDescription": "+{ new Magnifier, with which you can more carefully observe your Observations!",
                "bonusValue": 1
            }),
        new MineheadOpponentBase(13, <MineheadOpponentModel>{
                "progressionIndex": 13,
                "displayId": 9,
                "name": "Ironhead",
                "ordinalLabel": "fourteenth",
                "titleLabel": "the honorable",
                "bonusDescription": "+{ LVs for your Grind Time bubble every day",
                "bonusValue": 30
            }),
        new MineheadOpponentBase(14, <MineheadOpponentModel>{
                "progressionIndex": 14,
                "displayId": 28,
                "name": "Purrhead",
                "ordinalLabel": "fifteenth",
                "titleLabel": "the honorable",
                "bonusDescription": "+{% grand discovery chance per Spelunking LV",
                "bonusValue": 2
            }),
        new MineheadOpponentBase(15, <MineheadOpponentModel>{
                "progressionIndex": 15,
                "displayId": 5,
                "name": "Screamhead",
                "ordinalLabel": "sixteenth",
                "titleLabel": "the honorable",
                "bonusDescription": "+{ daily bubble LVs from Kattlekruk divinity",
                "bonusValue": 10
            }),
        new MineheadOpponentBase(16, <MineheadOpponentModel>{
                "progressionIndex": 16,
                "displayId": 15,
                "name": "Ballhead",
                "ordinalLabel": "seventeenth",
                "titleLabel": "the honorable",
                "bonusDescription": "The trapping bonus from your Magnesium Atom keeps increasing for +{ extra days",
                "bonusValue": 20
            }),
        new MineheadOpponentBase(17, <MineheadOpponentModel>{
                "progressionIndex": 17,
                "displayId": 10,
                "name": "Grosshead",
                "ordinalLabel": "eighteenth",
                "titleLabel": "the honorable",
                "bonusDescription": "}x higher chance to grow Chemical Plants in Gaming",
                "bonusValue": 5
            }),
        new MineheadOpponentBase(18, <MineheadOpponentModel>{
                "progressionIndex": 18,
                "displayId": 7,
                "name": "Blindhead",
                "ordinalLabel": "nineteenth",
                "titleLabel": "the honorable",
                "bonusDescription": "+{ more Trimmed Construction Slot, which build things $x faster",
                "bonusValue": 1
            }),
        new MineheadOpponentBase(19, <MineheadOpponentModel>{
                "progressionIndex": 19,
                "displayId": 24,
                "name": "Detahead",
                "ordinalLabel": "twentieth",
                "titleLabel": "the honorable",
                "bonusDescription": "}x extra Monument AFK Hours gained from all sources for all monuments",
                "bonusValue": 25
            }),
        new MineheadOpponentBase(20, <MineheadOpponentModel>{
                "progressionIndex": 20,
                "displayId": 0,
                "name": "Brainhead",
                "ordinalLabel": "twenty first",
                "titleLabel": "the honorable",
                "bonusDescription": "+{ new Magnifier, further expanding your capacity to scrutinize and systematically examine your Observations",
                "bonusValue": 1
            }),
        new MineheadOpponentBase(21, <MineheadOpponentModel>{
                "progressionIndex": 21,
                "displayId": 6,
                "name": "Brainhead",
                "ordinalLabel": "twenty second",
                "titleLabel": "the honorable",
                "bonusDescription": "+{% Hat Rack bonus multi",
                "bonusValue": 2
            }),
        new MineheadOpponentBase(22, <MineheadOpponentModel>{
                "progressionIndex": 22,
                "displayId": 18,
                "name": "Leopahead",
                "ordinalLabel": "twenty third",
                "titleLabel": "the honorable",
                "bonusDescription": "}x daily amber gains from your Biggest Hauls in Spelunking",
                "bonusValue": 50
            }),
        new MineheadOpponentBase(23, <MineheadOpponentModel>{
                "progressionIndex": 23,
                "displayId": 4,
                "name": "Baldhead",
                "ordinalLabel": "twenty fourth",
                "titleLabel": "the honorable",
                "bonusDescription": "Nothing... yet...",
                "bonusValue": 23
            }),
        new MineheadOpponentBase(24, <MineheadOpponentModel>{
                "progressionIndex": 24,
                "displayId": 22,
                "name": "Royalhead",
                "ordinalLabel": "twenty fifth",
                "titleLabel": "the honorable",
                "bonusDescription": "Nothing... yet...",
                "bonusValue": 24
            }),
        new MineheadOpponentBase(25, <MineheadOpponentModel>{
                "progressionIndex": 25,
                "displayId": 11,
                "name": "Stouthead",
                "ordinalLabel": "twenty sixth",
                "titleLabel": "the honorable",
                "bonusDescription": "Nothing... yet...",
                "bonusValue": 25
            }),
        new MineheadOpponentBase(26, <MineheadOpponentModel>{
                "progressionIndex": 26,
                "displayId": 23,
                "name": "Chillhead",
                "ordinalLabel": "twenty seventh",
                "titleLabel": "the honorable",
                "bonusDescription": "Nothing... yet...",
                "bonusValue": 26
            }),
        new MineheadOpponentBase(27, <MineheadOpponentModel>{
                "progressionIndex": 27,
                "displayId": 25,
                "name": "Summerhead",
                "ordinalLabel": "twenty eighth",
                "titleLabel": "the honorable",
                "bonusDescription": "Nothing... yet...",
                "bonusValue": 27
            }),
        new MineheadOpponentBase(28, <MineheadOpponentModel>{
                "progressionIndex": 28,
                "displayId": 27,
                "name": "Tentahead",
                "ordinalLabel": "twenty ninth",
                "titleLabel": "the honorable",
                "bonusDescription": "Nothing... yet...",
                "bonusValue": 28
            }),
        new MineheadOpponentBase(29, <MineheadOpponentModel>{
                "progressionIndex": 29,
                "displayId": 29,
                "name": "Humungohead",
                "ordinalLabel": "thirtieth",
                "titleLabel": "the honorable",
                "bonusDescription": "Nothing... yet...",
                "bonusValue": 29
            }),
        new MineheadOpponentBase(30, <MineheadOpponentModel>{
                "progressionIndex": 30,
                "displayId": 30,
                "name": "Mr Minehead",
                "ordinalLabel": "final",
                "titleLabel": "the big man himself",
                "bonusDescription": "Nothing... yet...",
                "bonusValue": 30
            }),
        new MineheadOpponentBase(31, <MineheadOpponentModel>{
                "progressionIndex": 31,
                "displayId": 31,
                "name": "Boghead",
                "ordinalLabel": "permanent",
                "titleLabel": "the never ending",
                "bonusDescription": "Nothing... yet...",
                "bonusValue": 31
            })    
]
}
