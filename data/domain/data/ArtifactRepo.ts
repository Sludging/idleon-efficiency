import { ArtifactModel } from '../model/artifactModel';

export class ArtifactBase { constructor(public index: number, public data: ArtifactModel) { } }



export const initArtifactRepo = () => {
    return [    
        new ArtifactBase(0, <ArtifactModel>{
                "name": "Moai Head",
                "baseBonus": 10,
                "baseFindChance": 5,
                "qtyBonus": 1,
                "bonus": "Get bonuses from all shrines from any map! You must be in same map/world to level them up though.",
                "ancientBonus": "All shrines level up +100% faster!",
                "ancientBonusQty": 100
            }),
        new ArtifactBase(1, <ArtifactModel>{
                "name": "Maneki Kat",
                "baseBonus": 10,
                "baseFindChance": 10,
                "qtyBonus": 2,
                "bonus": "+{% coins from all monsters per class level of your highest leveled character. Total Bonus: +}% coins",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(2, <ArtifactModel>{
                "name": "Ruble Cuble",
                "baseBonus": 10,
                "baseFindChance": 25,
                "qtyBonus": 1,
                "bonus": "+{% Total Dmg for every 10 items found after 500, as shown at The Slab. @ Total Bonus: +}% dmg",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(3, <ArtifactModel>{
                "name": "Fauxory Tusk",
                "baseBonus": 10,
                "baseFindChance": 100,
                "qtyBonus": 1,
                "bonus": "+{% artifact find chance per sailing LV. @ Total Bonus: +}% artifact chance",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(4, <ArtifactModel>{
                "name": "Gold Relic",
                "baseBonus": 10,
                "baseFindChance": 12,
                "qtyBonus": 1,
                "bonus": "All 3d printer samples grow by +1% per day for 40 days. Resets when taking a sample. Bonus shown in 3d Printer.",
                "ancientBonus": "Samples grow by 1.5% for 60 days instead!",
                "ancientBonusQty": 0.5
            }),
        new ArtifactBase(5, <ArtifactModel>{
                "name": "Genie Lamp",
                "baseBonus": 10,
                "baseFindChance": 40,
                "qtyBonus": 2,
                "bonus": "+{% loot value from sailing chests per Sailing Lv. @ Total Bonus: +}% loot value",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(6, <ArtifactModel>{
                "name": "Silver Ankh",
                "baseBonus": 10,
                "baseFindChance": 150,
                "qtyBonus": 1,
                "bonus": "Unlocks a new Post Office crate to spend P.O. boxes on!",
                "ancientBonus": "25% chance for +1 box when completing post office orders!",
                "ancientBonusQty": 25
            }),
        new ArtifactBase(7, <ArtifactModel>{
                "name": "Emerald Relic",
                "baseBonus": 10,
                "baseFindChance": 25,
                "qtyBonus": 1,
                "bonus": "Convert treasures into gold bars! Go see Blobby G, the goldbar blobulyte, on the docks for info.",
                "ancientBonus": "Get 1.30x more gold bars from converting!",
                "ancientBonusQty": 50
            }),
        new ArtifactBase(8, <ArtifactModel>{
                "name": "Fun Hippoete",
                "baseBonus": 10,
                "baseFindChance": 200,
                "qtyBonus": 6,
                "bonus": "+{% total dmg per power of 10 Construction Build Rate. @ Total Bonus: +}% dmg",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(9, <ArtifactModel>{
                "name": "Arrowhead",
                "baseBonus": 10,
                "baseFindChance": 30,
                "qtyBonus": 1,
                "bonus": "Enables you to manage which chest rarities your captains deliver! Helps declutter your loot pile.",
                "ancientBonus": "1.25x higher chance to get rare chests!",
                "ancientBonusQty": 25
            }),
        new ArtifactBase(10, <ArtifactModel>{
                "name": "10 AD Tablet",
                "baseBonus": 10,
                "baseFindChance": 80,
                "qtyBonus": 4,
                "bonus": "+{% Sailing Speed for every 10 items found after 500, as shown at The Slab. @ Total Bonus: +}% speed",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(11, <ArtifactModel>{
                "name": "Ashen Urn",
                "baseBonus": 10,
                "baseFindChance": 250,
                "qtyBonus": 1,
                "bonus": "+{% Divinity gain per class level of your highest leveled character, up to Lv 200.",
                "ancientBonus": "Applies up to character level 400 instead!",
                "ancientBonusQty": 200
            }),
        new ArtifactBase(12, <ArtifactModel>{
                "name": "Amberite",
                "baseBonus": 10,
                "baseFindChance": 40,
                "qtyBonus": 1,
                "bonus": "The lab bonus 'No Bubble Left Behind' affects +{ more bubbles!",
                "ancientBonus": "Affects +1 additional bubbles per day!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(13, <ArtifactModel>{
                "name": "Triagulon",
                "baseBonus": 10,
                "baseFindChance": 125,
                "qtyBonus": 15,
                "bonus": "+{% cooking speed per power of 10 Turkey owned. @ Total Bonus: +}% Spd",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(14, <ArtifactModel>{
                "name": "Billcye Tri",
                "baseBonus": 10,
                "baseFindChance": 300,
                "qtyBonus": 1,
                "bonus": "Unlocks a new Post Office crate to spend P.O. boxes on!",
                "ancientBonus": "25% chance for +1 box when completing post office orders!",
                "ancientBonusQty": 25
            }),
        new ArtifactBase(15, <ArtifactModel>{
                "name": "Frost Relic",
                "baseBonus": 10,
                "baseFindChance": 100,
                "qtyBonus": 30,
                "bonus": "+{% Efficiency for all skills in World 1, World 2, and World 3!",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 30
            }),
        new ArtifactBase(16, <ArtifactModel>{
                "name": "Chilled Yarn",
                "baseBonus": 10,
                "baseFindChance": 400,
                "qtyBonus": 1,
                "bonus": "All the Sigils in alchemy give 2x their displayed bonus.",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(17, <ArtifactModel>{
                "name": "Causticolumn",
                "baseBonus": 10,
                "baseFindChance": 150,
                "qtyBonus": 10,
                "bonus": "+{ Max Level for all cooking meals. Jade plates here we come!",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(18, <ArtifactModel>{
                "name": "Jade Rock",
                "baseBonus": 10,
                "baseFindChance": 500,
                "qtyBonus": 3,
                "bonus": "+{% Divinity for every 10 items found after 500, as shown at The Slab. @ Total Bonus: +}% Divinity",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(19, <ArtifactModel>{
                "name": "Dreamcatcher",
                "baseBonus": 10,
                "baseFindChance": 200,
                "qtyBonus": 2,
                "bonus": "Your loot pile can hold +{ more sailing chests at once! What a dream situation!",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 25
            }),
        new ArtifactBase(20, <ArtifactModel>{
                "name": "Gummy Orb",
                "baseBonus": 10,
                "baseFindChance": 600,
                "qtyBonus": 15,
                "bonus": "+{% bits for every 10 items found after 500, as shown at The Slab. @ Total Bonus: +}% bits",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(21, <ArtifactModel>{
                "name": "Fury Relic",
                "baseBonus": 10,
                "baseFindChance": 700,
                "qtyBonus": 25,
                "bonus": "+{ Max Talent Book LV at the library.",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(22, <ArtifactModel>{
                "name": "Cloud Urn",
                "baseBonus": 10,
                "baseFindChance": 300,
                "qtyBonus": 1,
                "bonus": "Unlocks a new Post Office crate to spend P.O. boxes on!",
                "ancientBonus": "25% chance for +1 box when completing post office orders!",
                "ancientBonusQty": 25
            }),
        new ArtifactBase(23, <ArtifactModel>{
                "name": "Weatherbook",
                "baseBonus": 10,
                "baseFindChance": 800,
                "qtyBonus": 10,
                "bonus": "+{% bits gained in the Gaming Garden per gaming lv. @ Total Bonus: +}% bits",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(24, <ArtifactModel>{
                "name": "Giants Eye",
                "baseBonus": 10,
                "baseFindChance": 900,
                "qtyBonus": 25,
                "bonus": "+{% shiny pet breed chance per day. Stacks until successfully breeding a shiny!",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(25, <ArtifactModel>{
                "name": "Crystal Steak",
                "baseBonus": 10,
                "baseFindChance": 1000,
                "qtyBonus": 2,
                "bonus": "+{% total damage per 100 main stat, STR AGI WIS or LUK based on your class. Total Bonus: +}% dmg",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(26, <ArtifactModel>{
                "name": "Trilobite Rock",
                "baseBonus": 10,
                "baseFindChance": 1100,
                "qtyBonus": 25,
                "bonus": "+{% multikill per damage tier.",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(27, <ArtifactModel>{
                "name": "Opera Mask",
                "baseBonus": 10,
                "baseFindChance": 1200,
                "qtyBonus": 1,
                "bonus": "+{% total damage per power of 10 gold bars owned in sailing. Total Bonus: +}% dmg",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(28, <ArtifactModel>{
                "name": "Socrates",
                "baseBonus": 10,
                "baseFindChance": 1300,
                "qtyBonus": 10,
                "bonus": "+{% all stats. STR, AGI, WIS and LUK.",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            }),
        new ArtifactBase(29, <ArtifactModel>{
                "name": "The True Lantern",
                "baseBonus": 10,
                "baseFindChance": 1400,
                "qtyBonus": 15,
                "bonus": "+{% total dmg per power of 10 Particles owned in atom collider. @ Total Bonus: +}% dmg",
                "ancientBonus": "The artifact's main bonus is doubled!",
                "ancientBonusQty": 1
            })    
]
}
